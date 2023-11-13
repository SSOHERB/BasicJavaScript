const text = [
  `대통령이 제1항의 기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 국군의 조직과 편성은 법률로 정한다. 제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다.`,
  `국회에서 의결된 법률안은 정부에 이송되어 15일 이내에 대통령이 공포한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.`,
  `대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다.`,
  `군사재판을 관할하기 위하여 특별법원으로서 군사법원을 둘 수 있다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.`,
  `국회나 그 위원회의 요구가 있을 때에는 국무총리·국무위원 또는 정부위원은 출석·답변하여야 하며, 국무총리 또는 국무위원이 출석요구를 받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수 있다.`,
  `선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서 하되, 균등한 기회가 보장되어야 한다. 모든 국민은 법률이 정하는 바에 의하여 납세의 의무를 진다.`,
  `국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다. 제2항과 제3항의 처분에 대하여는 법원에 제소할 수 없다.`,
  `대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.`,
  `대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.`,
];

const form = document.querySelector(".lorem-form");
const amount = document.getElementById("amount");
const result = document.querySelector(".lorem-txt");

form.addEventListener("submit", function (e) {
  // button(type=submit) 로딩 방지
  e.preventDefault();

  // value : input 값을 int형으로 변경
  // random : text의 길이만큼 * 랜덤 숫자의 소수점 버림
  const value = parseInt(amount.value);
  const random = Math.floor(Math.random() * text.length);

  /* 모든 오류 방지
		- 문자열 or 숫자가 아님 or 0이하의 수 or 10이상의 수 or 1
		isNaN(value) === true이면, #amount의 값이 숫자가 아님
		- .lorem-txt(result)안에 html 생성
		- text 배열의 원소 중 아무거나 1개 구문 넣기
   */
    if (value === "" || isNaN(value) || value < 0 || value > 9 || value === 1) {
    result.innerHTML = `<p class="result">${text[random]}</p>`;
  } else {
    // 사용자가 입력했을 때
    let tempTxt = text.slice(0, value); // text[0] ~ text[사용자가 입력한 문단 수] 만큼 배열 복사
    // 문단 수는 각각의 <p>태그로 HTML 화면 출력
    tempTxt = tempTxt
      .map(function (item) {
        return `<p class="result">${item}</p>`;
      })
      .join("");
    result.innerHTML = tempTxt;
  }
});
