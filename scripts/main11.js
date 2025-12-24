// 描画関数
function renderQuiz() {
    const container = document.getElementById('quiz-container');

    quizData.forEach((section, sIdx) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section-block';

        // セクションタイトル
        let html = `<h2 class="level-3">${section.title}</h2>`;

        // セクション用画像(あれば)
        if (section.imageUrl) {
            html += `<img src="./${section.imageUrl}" class="quiz-image">`
        }

        section.questions.forEach((q, qIdx) => {
            let qImgHtml = q.imageUrl ? `<img src="./${q.imageUrl}" class="quiz-image">` : "";

            // 小門タイトル(あれば)
            if (q.title) {
                html += `<h2 class="q-title level-3">${q.title}</h2>`
            }

            // \n を "<br>　" に置き換える
            let parts = q.sampleAnswer.split('\n');
            let questionHtml = "";
            for(let i = 0; i < parts.length; i++) {
                questionHtml += parts[i];
                if(i < parts.length - 1) {
                    questionHtml += "<br>　";
                }
            }

            html += `
                <div class="q-item">
                    <p class="q-text level-4">${q.text}</p>
                    ${qImgHtml}
                    <textarea id="user-input-${sIdx}-${qIdx}" class="level-4" placeholder="キーワード：${q.keyword}"></textarea>
                    <button class="btn-check level-4" onclick="toggleAnswer(${sIdx}, ${qIdx})">解答例を表示 / 非表示</button>
                    <div id="answer-${sIdx}-${qIdx}" class="result-area sample">
                        <p class="sample-label level-4">【解答例】</p>
                        <p class="sample-answer level-4">　${questionHtml}</p>
                    </div>
                </div>`;
        });

        sectionDiv.innerHTML = html;
        container.appendChild(sectionDiv);
    });
}

// 解答の表示・非表示を切り替える
function toggleAnswer(sIdx, qIdx) {
    const ansDiv = document.getElementById(`answer-${sIdx}-${qIdx}`);
    if (ansDiv.style.display === "block") {
        ansDiv.style.display = "none";
    } else {
        ansDiv.style.display = "block";
    }
}

renderQuiz();