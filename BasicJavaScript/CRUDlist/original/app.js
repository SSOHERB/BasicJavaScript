const form = document.querySelector(".list-form");
const alert = document.querySelector(".alert");
const input = document.getElementById("userInput");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".list-container");
const list = document.querySelector(".item-list");
const clearBtn = document.querySelector(".clear-btn");

// Edit Option
let editElement;
let editFlag = false; // 수정모드의 상태를 추적하기 위한 boolean
let editID = "";

// ############# Event Listeners #############
form.addEventListener("submit", addItem); // form submit하면 addItem() 실행
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

// ############# Fundctions 함수 #############

// ## 01. item 추가
function addItem(e) {
  e.preventDefault();
  const value = input.value;
  const id = new Date().getTime().toString(); // 현재시간을 ms(밀리초)로 변경

  // 값 입력했을때(input이 비어있지 않을때 and true)
  if (value !== "" && !editFlag) {
    /* ### element 설정 ###
			<article class="item" data-id = "날짜 시간"> 생성 후, 하위 요소들 전부 추가(p, .btn-container)
		*/
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("item");
    element.innerHTML = `<p class="title">${value}</p>
					<div class="btn-container">
						<button class="edit-btn">
							<i class="bi bi-pencil-square"></i>
						</button>
						<button class="del-btn">
							<i class="bi bi-trash-fill"></i>
						</button>
					</div>`;

    // ### 버튼 이벤트 리스너 추가 ###
    const delBtn = element.querySelector(".del-btn");
    delBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // .item-list 자식요소로 .item 추가
    list.appendChild(element);
    displayAlert("리스트에 아이템이 추가되었습니다.", "success");
    container.classList.add("show-container");

    // 현재시간, input 값을 Local에 저장
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    // 사용자가 input에 값을 입력했을 때, or 수정 버튼을 눌렀을 때
    // console.log("변경테스트");
    editElement.innerHTML = value;
    displayAlert("값이 변화되었습니다.", "success");

    // local에 저장
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("값을 입력하지 않았습니다.", "danger");
  }
}

// ## 02. alert 보이기
function displayAlert(text, action) {
  // <p> 태그에 매개변수 text 문자열 넣고 action 마다 class 추가해서 style 변경
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // 1000ms 이후에 alert 삭제
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// ## 03. list 전체 삭제
function clearItems() {
  const items = document.querySelectorAll(".item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("전체 삭제되었습니다.", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

// ## 04. list 1개씩 삭제
function deleteItem(e) {
  // A. 삭제 버튼(.del-btn)이 포함된 최상위 요소, article.item을 삭제한다.
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);

  // B. article.item이 아예없다면 .show-container 클래스도 제거 후 삭제 알럿
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("아이템이 삭제되었습니다.", "danger");

  setBackToDefault();
  // C. localStorage에서 해당 id 삭제
  removeFromLocalStorage(id);
}

// ## 05. item 수정
function editItem(e) {
  // article.item 및 p.title
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;

  input.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "수정";
}

// ## 06. 입력필드와 수정 관련 상태 변수들을 기본값으로 초기화
function setBackToDefault() {
  input.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "추가";
}

// ############# Local Storage #############
// 브라우저의 로컬스토리지 추가, 수정, 삭제

// 1. local Storage에 추가(set)
function addToLocalStorage(id, value) {
  const input = { id, value };
  let items = getLocalStorage();
  items.push(input);
  // JSON.stringify(객체) : 객체를 JSON으로 변환(직렬화)
  // setItem
  localStorage.setItem("list", JSON.stringify(items));
}

// 2. local Storage에서 데이터 추출(get)
function getLocalStorage() {
  // getItem("key") 키로부터 데이터 읽기
  // JSON.parse() json문자열을 다시 자바스크립트 객체로 변환(역직렬화)
  // ???? "list"는 객체의 key로 추측
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// 3. local Storage에서 삭제 후 저장
function removeFromLocalStorage(itemToRemoveId) {
  let items = getLocalStorage();

  /* # 해당 조건에 있는 것만 필터링해서 새로운 배열(items)로 넣음
  - 기존 items(local Storage)에 있는 매개변수로 넘겨받은 itemToRemoveId와 비교함
  - 매개변수로 넘겨받은 itemToRemoveId와 같지 않은 원소들로만 새로운 배열로 return
	- 즉, itemToRemoveId 를 삭제하는 함수
	*/
  items = items.filter(function (item) {
    if (item.id !== itemToRemoveId) {
      return item;
    }
  });
  // list(key)로 새로운 목록을 JSON 형태로 문자열화해서 저장
  localStorage.setItem("list", JSON.stringify(items));
}

// 4. local Storage에서 수정
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  // 매개변수로 받은 id와 기존 items(local Storage)에 있는 id를 비교해서 값 변경
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// ############# Setup items #############
function setupItems() {
  let items = getLocalStorage();

  // #01. 로컬에 저장된 item들 화면에 보여지기
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("item");
  element.innerHTML = `<p class="title">${value}</p>
						<div class="btn-container">
							<button class="edit-btn">
								<i class="bi bi-pencil-square"></i>
							</button>
							<button class="del-btn">
								<i class="bi bi-trash-fill"></i>
							</button>
						</div>`;

  // ### 버튼 이벤트 리스너 추가 ###
  const delBtn = element.querySelector(".del-btn");
  delBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // .item-list 자식요소로 .item 추가
  list.appendChild(element);
}
