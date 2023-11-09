// 1. 문서객체 안에 있는 선택자들 가져오는 방법
const questions = document.querySelectorAll(".question");

/* 다수의 .question를 가져오는데, 각각의 .question의 .question-btn에 click 이벤트 넣기
	click시, 콜백함수 실행
*/
questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", () => {
    // console.log(question); 각각의 article 콘솔창에 출력

    /* 필수 아님! 
			다수의 .question에서 각각의 .question과 같지 않다면, show-text 클래스를 제거
			=> 클릭한 .question-btn의 .question외에 다른 .question는 contents 닫기
		*/
    questions.forEach((item) => {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    // .question-btn 클릭시, 각각의 .question에 가상 클래스(.show-text) add & remove
    question.classList.toggle("show-text");
  });
});

// 2. DOM 탐색 (Traversing the DOM) 방법
/*
	btns는 여러개의 문서객체를 가졌다. = querySelectorAll() 메서드 사용
	forEach는 배열요소를 반복할때 사용
*/
/* const btns = document.querySelectorAll(".question-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // 결국 question은 클릭한 타겟(.question-btn)의 조상요소인 .question을 의미
    const question = e.currentTarget.parentElement.parentElement;
    question.classList.toggle("show-text");
  });
}); */
