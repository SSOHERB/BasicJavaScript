const tabswrap = document.querySelector(".tabs-wrap");
const btns = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");

tabswrap.addEventListener("click", (e) => {
  // 클릭시 이벤가 발생한 요소의 data-id 값 가져오기
  const id = e.target.dataset.id;
  // console.log(id);

  if (id) {
    // 선택된 다른 버튼들 제거
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    // 다른 tab에 active 우선 제거
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // .tab의 속성중 id를 가져옴
    const element = document.getElementById(id);
    // console.log(element);
    element.classList.add("active");
  }
});
