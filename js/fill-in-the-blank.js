// 画像が保存されているディレクトリのパス
const imageDirectoryPath = "images";

// ================================
// 描画関数
// ================================
function renderQuiz() {
    const container = document.getElementById('quiz-container');

    quizData.forEach((section, sIdx) => {
        let html = `<div class="section">`;

        // セクションタイトル
        html += `<h2 class="section-title level-2">問題${sIdx + 1}．${section.title}</h2>`;

        // セクション用画像(あれば)
		if (section.images && section.images.length > 0) {
			html += `<div class="image-wrap">`;
			section.images.forEach(img => html += `<img src="./${imageDirectoryPath}/${img}" alt="${img}">`);
			html += `</div>`;
		}

        let single = section.questions && section.questions.length > 0 ? false : true;

        let question = !single ? section.questions : [section];
        question.forEach((q, qIdx) => {
            html += `<div class="question">`;

            if (!single && q.title) {
                html += `<p class="question-title level-3">問${sIdx + 1}-${qIdx + 1}．${q.title}</p>`;
            } else if (question.length > 1) {
                html += `<p class="question-title level-3">問${sIdx + 1}-${qIdx + 1}．</p>`;
            }

            if (!single && q.images) {
                html += `<div class="image-wrap">`;
                q.images.forEach(img => html += `<img src="./${imageDirectoryPath}/${img}" alt="${img}">`);
                html += `</div>`;
            }

            let duplication = 0; // 重複分保存用変数

            html += `<ul class="question-text-wrap">`
            q.text.forEach((text, textIdx) => {
                html += `<li class="question-text list level-4">`;
                // [] を順番に input に置き換える
                let parts = text.split('[]');
                // console.log("parts:", parts, "part.length:", parts.length)
                let last_i = 0; // インデックス保存用一時変数
                for (let i = 0; i < parts.length; i++) {
                    // console.log("textIdx:", textIdx, ", i:", i, "last_i:", last_i, "duplication:", duplication)
                    html += parts[i];
                    if (i < parts.length - 1) {
                        html += `<span class="input-label-wrap"><label for="${sIdx}-${qIdx}-${textIdx + i + duplication}" class="input-text-label">(${textIdx + i + duplication + 1})</label><input type="text" id="${sIdx}-${qIdx}-${textIdx + i + duplication}" class="level-4" autocomplete="off"></span>`;
                    }
                    if (i > 1) {
                        last_i = i - 1; // 最後の一つ前のインデックスを一時保存
                        // console.log("update last_i:", last_i, ", i:", i)
                    }
                }

                if (last_i != 0) {
                    duplication += last_i; // forループが終わってから、重複分として足し合わせて保存
                    // console.log("update duplication")
                }
                html += `</li>`;
            })
            html += `
                        </ul>
                    </div><!-- end of question -->
            `;
        });

        html += `
                        <button class="btn btn-check level-5" onclick="checkSection(${sIdx})">答え合わせ</button>
                    <div id="result-${sIdx}" class="result-area"></div>
                </div><!-- end of section -->
        `;

        container.insertAdjacentHTML("beforeend", html);
    });

    container.insertAdjacentHTML("beforeend", `
            <div class="btn-area">
                <button class="btn btn-check no-margin level-5" onclick="checkAnswers()">採点する</button>
                <button class="btn btn-close level-5" onclick="closeAnswers()">結果を閉じる</button>
            </div>
    `);
}



// 正誤判定
function checkSection(sIdx) {
    const section = quizData[sIdx];
    const result = document.getElementById(`result-${sIdx}`);
    let sectionCorrect = true;
    let resultHtml = "";

    let single = section.questions && section.questions.length > 0 ? false : true;

    let question = !single ? section.questions : [section];
    question.forEach((q, qIdx) => {
        let questionCorrect = true;

        resultHtml += ``;
        let answer = "";
        q.answers.forEach((ans, aIdx) => {
            const userInput = document.getElementById(`${sIdx}-${qIdx}-${aIdx}`);
            if (userInput.value.trim() !== ans) {
                questionCorrect = false;
                sectionCorrect = false;
                userInput.classList.add("wrong");
                userInput.classList.remove("correct");
            } else {
                userInput.classList.remove("wrong");
                userInput.classList.add("correct");
            }

            if (aIdx != 0) {
                answer += "　";
            }
            answer += `(${aIdx + 1}) <span id="answer-${sIdx}-${qIdx}-${aIdx}">${ans}</span>`;
        });

        if (true) {
            resultHtml += `<li>`;
            if (question.length > 1) {
                resultHtml += `問${sIdx + 1}-${qIdx + 1} `;
            }
            resultHtml += `正解: <strong>${answer}</strong></li>`;
        }

    });

    // section.questions.forEach((q, qIdx) => {
    //     let qCorrect = true;
    //     let qAnswers = [];

    //     q.answers.forEach((ans, aIdx) => {
    //         const userInput = document.getElementById(`input-${sIdx}-${qIdx}-${aIdx}`).value.trim();
    //         if (userInput !== ans) {
    //             qCorrect = false;
    //             sectionCorrect = false;
    //         }
    //         qAnswers.push(ans);
    //     });

    //     if (!qCorrect) {
    //         resultHtml += `<li>${qIdx + 1}の正解: <strong>${qAnswers.join(' / ')}</strong></li>`;
    //     }
    // });

    result.style.display = "block";
    result.classList.remove("correct", "wrong");
    if (sectionCorrect) {
        result.classList.add("correct");
        result.innerHTML = `<p class="answer-label level-4">全問正解です。</p><ul class="answer-list level-4">${resultHtml}</ul>`;
    } else {
        result.classList.add("wrong");
        result.innerHTML = `<p class="answer-label level-4">不正解が含まれています。</p><ul class="answer-list level-4">${resultHtml}</ul>`;
    }

    result.innerHTML += `<button class="btn btn-close right-justify level-5" onclick="closeSection(${sIdx})">閉じる</button>`;
}


// 答えを閉じる
function closeSection(sIdx) {
    const section = quizData[sIdx];
    const result = document.getElementById(`result-${sIdx}`);
    result.classList.remove("correct", "wrong");
    result.innerHTML = `<p class="answer-label level-4">解答中</p>`;

    let html = "";
    let single = section.questions && section.questions.length > 0 ? false : true;

    let question = !single ? section.questions : [section];
    question.forEach((q, qIdx) => {
        html += `<li>`;
        if (question.length > 1) {
            html += `問${sIdx + 1}-${qIdx + 1} `;
        }
        html += `採点されていません</li>`;
        q.answers.forEach((ans, aIdx) => {
            const userInput = document.getElementById(`${sIdx}-${qIdx}-${aIdx}`);
            userInput.classList.remove("correct", "wrong");
        })
    })
    result.innerHTML += `<ul class="answer-list level-4">${html}</ul><!-- ss -->`;
}


function checkAnswers() {
	const sections = document.querySelectorAll(".section");
    sections.forEach((section, sIdx) => {
        checkSection(sIdx);
    })
}

function closeAnswers() {
	const sections = document.querySelectorAll(".section");
    sections.forEach((section, sIdx) => {
        closeSection(sIdx);
    })
}

renderQuiz();
closeAnswers();