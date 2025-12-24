// ================================
// 描画関数
// ================================
function renderQuiz() {
    const container = document.getElementById('quiz-container');

    quizData.forEach((section, sIdx) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section-block';

        // セクションタイトル
        let html = `<h2 class="level-3">${section.title}</h2>`;

        // セクション用画像(あれば)
        if (section.imageUrl) {
            html += `<img src="${section.imageUrl}" class="quiz-image">`;
        }
        section.questions.forEach((q, qIdx) => {
            let duplication = 0;
            q.text.forEach((text, textIdx) => {
                // [] を順番に input に置き換える
                let parts = text.split('[]');
                let questionHtml = "";
                let last_i = 0;
                for (let i = 0; i < parts.length; i++) {
                    questionHtml += parts[i];
                    if (i < parts.length - 1) {
                        questionHtml += `<input type="text" id="input-${sIdx}-${textIdx + i + duplication}" class="level-4" autocomplete="off">`;
                    }
                    if (i > duplication) {
                        last_i = i - 1;
                    }
                }
                duplication += last_i;

                html += `<p class="q-text level-4">${textIdx + 1}. ${questionHtml}</p>`;
            })
        });
        /*
        section.questions.forEach((q, qIdx) => {
            // [] を順番に input に置き換える
            let parts = q.text.split('[]');
            let questionHtml = "";

            for (let i = 0; i < parts.length; i++) {
                questionHtml += parts[i];
                if (i < parts.length - 1) {
                    questionHtml += `<input type="text" id="input-${sIdx}-${qIdx}-${i}" class="level-4" autocomplete="off">`;
                }
            }

            html += `<p class="q-text level-4">${qIdx + 1}. ${questionHtml}</p>`;
        });
        */

        html += `<button class="btn-check level-4" onclick="checkSection(${sIdx})">答え合わせ</button>`;
        html += `<div id="result-${sIdx}" class="result-area"></div>`;

        sectionDiv.innerHTML = html;
        container.appendChild(sectionDiv);
    });
}


// 正誤判定
function checkSection(sIdx) {
    const section = quizData[sIdx];
    const resultDiv = document.getElementById(`result-${sIdx}`);
    let sectionCorrect = true;
    let resultHtml = "";

    section.questions.forEach((q, qIdx) => {
        let qCorrect = true;
        let qAnswers = [];

        q.answers.forEach((ans, aIdx) => {
            const userInput = document.getElementById(`input-${sIdx}-${aIdx}`).value.trim();
            if (userInput !== ans) {
                qCorrect = false;
                sectionCorrect = false;
            }
            qAnswers.push(ans);
        });

        if (!qCorrect) {
            resultHtml += `<li>正解: <strong>${qAnswers.join(' / ')}</strong></li>`;
        }
    });
    /*
    section.questions.forEach((q, qIdx) => {
        let qCorrect = true;
        let qAnswers = [];

        q.answers.forEach((ans, aIdx) => {
            const userInput = document.getElementById(`input-${sIdx}-${qIdx}-${aIdx}`).value.trim();
            if (userInput !== ans) {
                qCorrect = false;
                sectionCorrect = false;
            }
            qAnswers.push(ans);
        });

        if (!qCorrect) {
            resultHtml += `<li>${qIdx + 1}の正解: <strong>${qAnswers.join(' / ')}</strong></li>`;
        }
    });
    */

    resultDiv.style.display = "block";
    resultDiv.classList.remove("correct", "incorrect");
    if (sectionCorrect) {
        resultDiv.classList.add("correct");
        resultDiv.innerHTML = "<p class='ans-text level-4'>全問正解です。</p>";
    } else {
        resultDiv.classList.add("incorrect");
        resultDiv.innerHTML = `<p class="ans-text level-4">⚠️不正解が含まれています。</p><ul class="ans-list level-4">${resultHtml}</ul>`;
    }

    resultDiv.innerHTML += `<button class="btn-close level-4" onclick="closeSection(${sIdx})">閉じる</button>`
}


// 答えを閉じる
function closeSection(sIdx) {
    const resultDiv = document.getElementById(`result-${sIdx}`);
    resultDiv.style.display = "none";
}


renderQuiz();