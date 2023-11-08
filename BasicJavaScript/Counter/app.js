// 첫 시작 카운트
let count = 0;

// 숫자 카운팅 출력 및 버튼
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

// forEach 각각의 원소에 콜백함수 실행
btns.forEach((btn) => {

	// 매개변수(btn)를 클릭했을 때 콜백함수 실행
  btn.addEventListener("click", (e) => {
    // .btn 클래스를 전부 읽어오는 styles 변수
    const styles = e.currentTarget.classList;

    // 1. 카운터 
		// decrease : 감소(--), increase : 증가(++), reset(0)
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

		// 2. 색상 변경
		if(count > 0) {
			value.style.color = "green";
		} else if(count < 0) {
			value.style.color = "red";
		} else {
			value.style.color = "#222";
		}

		// 3. count 값 화면 출력
    value.textContent = count;
  });
});
