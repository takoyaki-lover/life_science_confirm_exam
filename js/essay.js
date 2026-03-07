// 画像が保存されているディレクトリのパス
const imageDirectoryPath = "images";

// 描画関数
function renderQuiz() {
    const container = document.getElementById('quiz-container');

    quizData.forEach((section, sIdx) => {
        let html = `<div class="section">`;

        // セクションタイトル
        html += `<h2 class="section-title level-2">問題${sIdx + 1}．${section.title}</h2>`;

        // セクション用の画像(あれば)
		if (section.images && section.images.length > 0) {
			html += `<div class="image-wrap">`;
			section.images.forEach(img => html += `<img src="./${imageDirectoryPath}/${img}" alt="${img}">`);
			html += `</div>`;
		}

        // サブセクションがあるか判定
        let hasSubSection = section.subSection && section.subSection.length > 0 ? true : false;

        // debug
        // console.log(sIdx, section.subSection, hasSubSection)
        // if (hasSubSection) {
        //     section.subSection.forEach(s => console.log(s.questions))
        // }
        // end of debug

        // サブセクションがあるかによって、データの扱い方を変える
        let subSection = !hasSubSection ? [section] : section.subSection;
        subSection.forEach((questionList, subSIdx) => {
            // 区切り線(サブセクション2つ目以降)
            if (subSIdx > 0) {
                html += `<hr>`;
            }
            html += `<div class="sub-section">`;
            // サブセクションタイトル(あれば)
            if (hasSubSection && questionList.title) {
                html += `<h2 class="sub-section-title level-3">${subSIdx + 1}．${questionList.title}</h2>`;
            } else if (subSection.length > 1) {
                html += `<h2 class="sub-section-title level-3">${subSIdx + 1}．</h2>`;
            }

            // サブセクション用の画像(あれば)
            if (hasSubSection && questionList.images) {
                html += `<div class="image-wrap">`;
                questionList.images.forEach(img => html += `<img src="./${imageDirectoryPath}/${img}" alt="${img}">`);
                html += `</div>`;
            }

            questionList.questions.forEach((q, qIdx) => {
                html += `<div class="question background-wrapped">
                            <p class="question-title level-4">${q.text}</p>
                `;

                // 小問用の画像(あれば)
                if (q.images) {
                    html += `<div class="image-wrap">`;
                    q.images.forEach(img => html += `<img src="./${imageDirectoryPath}/${img}" alt="${img}">`);
                    html += `</div>`;
                }

                html += `
                        <textarea id="input-${sIdx}-${subSIdx}-${qIdx}" class="level-4" placeholder="ここに解答を入力"></textarea>
                        <button class="btn btn-check level-5" onclick="toggleAnswer(${sIdx}, ${subSIdx}, ${qIdx})">解答例を表示 / 非表示</button>
                        <div id="result-wrap-${sIdx}-${subSIdx}-${qIdx}" class="result-wrap">
                            <div id="answer-${sIdx}-${subSIdx}-${qIdx}" class="result-area sample">
                                <p class="sample-label level-4">【解答例】</p>
                `;

                // 解説用の画像(あれば)
                if (q.answerImages) {
                    html += `<div class="image-wrap">`;
                    q.answerImages.forEach(img => html += `<img src="./${imageDirectoryPath}/${img}" alt="${img}">`);
                    html += `</div>`;
                }

                html += `<p class="sample-answer level-4">　`;
                // \n を "<br>　" に置き換える
                let parts = q.sampleAnswer.split('\n');
                for(let i = 0; i < parts.length; i++) {
                    html += parts[i];
                    if(i < parts.length - 1) {
                        html += "<br>　";
                    }
                }

                html += `
                                    </p>
                                </div><!-- end of result-area -->
                            </div><!-- end of result-wrap -->
                        </div><!-- end of question -->
                `;
            });
            html += `</div><!-- end of sub-section -->`
        })
        html += `</div><!-- end of section -->`

        container.insertAdjacentHTML("beforeend", html);
    });
}


// 解答の表示・非表示を切り替える
function toggleAnswer(sIdx, subSIdx, qIdx) {
    const resultWrap = document.getElementById(`result-wrap-${sIdx}-${subSIdx}-${qIdx}`);
    const answer = document.getElementById(`answer-${sIdx}-${subSIdx}-${qIdx}`);
    if (resultWrap.classList.contains("opened")) {
        resultWrap.classList.remove("opened")
        resultWrap.style.height = "";
    } else {
        const height = answer.getBoundingClientRect().height;
        resultWrap.style.height = height + "px";
        resultWrap.classList.add("opened")
    }
}


// // ================================
// // 画像クリックで拡大表示（上半分）
// // ================================

// // 画面上半分のモーダル（半透明）
// const modal = document.createElement("div");
// modal.id = "image-modal";
// modal.title = "クリックして閉じる"
// modal.style.position = "fixed";
// modal.style.top = "0";
// modal.style.left = "0";
// modal.style.width = "100%";
// modal.style.height = "50%";
// modal.style.background = "rgba(0,0,0,0.5)";
// modal.style.display = "none";
// modal.style.zIndex = "9999";
// modal.style.cursor = "pointer";
// modal.style.justifyContent = "center";
// modal.style.alignItems = "center";
// document.body.appendChild(modal);

// // 画像本体
// const modalImg = document.createElement("img");
// modalImg.style.maxWidth = "100%"
// modalImg.style.height = "100%"
// modalImg.style.objectFit = "contain";
// modalImg.style.pointerEvents = "none";
// modal.appendChild(modalImg);

// // クリックで閉じる
// modal.addEventListener("click", () => {
// 	modal.style.display = "none";
// });

// // サムネイルクリックで表示
// function enableImageZoom() {
// 	document.querySelectorAll("img").forEach(img => {
//         img.title = "クリックして拡大表示する";
// 		img.style.cursor = "pointer";
// 		img.addEventListener("click", (event) => {
// 			modalImg.src = img.src;
// 			modal.style.display = "flex"; // 表示ON
// 			event.stopPropagation();
// 		});
// 	});
// }


renderQuiz();
// enableImageZoom();