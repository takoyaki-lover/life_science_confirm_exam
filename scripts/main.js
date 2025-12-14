function showResult(elementId, isCorrect, correctAnswers) {
    const res = document.getElementById(elementId);
    res.style.display = "block";
    if (isCorrect) {
        res.innerHTML = "<p class='hantei'>正解！</p>";
        res.className = "result correct";
    } else {
        res.innerHTML = "<p class='hantei'>不正解です。</p><span class='hint'>正解の例: " + correctAnswers.join(", ") + "</span>";
        res.className = "result incorrect";
    }
    res.innerHTML += `<button class="close-btn" onclick="closeResult('${elementId}')">閉じる</button>`
}

function closeResult(elementId) {
    const res = document.getElementById(elementId);
    res.style.display = "none";
}

let input = document.getElementsByTagName("input")
for (i = 0; i < input.length; i ++) {
    input[i].autocomplete = "off";
    console.log(i);
}
