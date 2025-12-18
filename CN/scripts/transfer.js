// exam-num クラス配列取得
const exam_num = document.querySelectorAll(".exam-num");


let url_tail = ["1-6", "8-12"]

// 小テスト変更
exam_num.forEach(function (exam_num) {
	exam_num.addEventListener("change", function () {
		num = exam_num.value;
		if (num != 0) {
			location.href = `./CN_exam_${url_tail[num - 1]}.html`;
		}
		else {
			location.href = "./home.html";
		}
	})
	exam_num.options[num].selected = true;
})
