const colors = ["green", "red", "rgba(133, 122, 200)", "#f15025"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

/* 문서객체.addEventListener(이벤트명, 콜백함수)
	= 문서객체를 '이벤트'하면 '콜백함수' 호출 
	btn.addEventListener("click", function(){});
*/
btn.addEventListener("click", () => {
	const randomNum = getRandomNum();

	// 랜덤 숫자 생성하는 함수로 생성된 숫자를 body 배경색 및 .color에 넣음
	// textConent는 입력된 문자열을 그대로 넣는 속성
	document.body.style.backgroundColor = colors[randomNum];
	color.textContent = colors[randomNum];
});

// 랜덤 숫자 생성하는 함수
function getRandomNum() {
	// 랜덤 숫자 생성 * colors의 배열 길이 => 소수점 내림(floor)
	return Math.floor(Math.random() * colors.length);
};