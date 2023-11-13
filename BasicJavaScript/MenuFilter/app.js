// items
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
  },
  {
    id: 3,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
  },
  {
    id: 4,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
  },
  {
    id: 5,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
  },
  {
    id: 6,
    title: "american classic",
    category: "lunch",
    price: 12.99,
  },
  {
    id: 7,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
  },
];

const itemsWrap = document.querySelector(".items-wrap");
const btnsWrap = document.querySelector(".btns-wrap");

// 페이지 로드시 만든 함수 실행
window.addEventListener("DOMContentLoaded", function () {
  showMenuItems(menu);
  showMenuBtns();
});

// 1. 메뉴 보여주는 함수
function showMenuItems(menuItems) {
  // map() 매개변수로 들어온 배열로 새로운 배열 만들기
  // .menu-item 생성(매개변수 item = menu 배열)
  // menu 배열의 title과 price를 각 클래스와 연동
  let showMenu = menuItems.map(function (item) {
    // console.log(item);
    return `<div class="menu-item"><h4>${item.title}</h4><strong class="price">$${item.price}</strong></div>`;
  });

  /* arry.join(구분자) 배열의 모든 요소를 연결하여 하나의 문자열로 만듦 => return된 HTML 문자열을 전부 합쳐 여러 개의 .menu-item 문자열 생성 */
  showMenu = showMenu.join("");
  // console.log(showMenu);

  // .items-wrap에 html 변경
  itemsWrap.innerHTML = showMenu;
}

// 2. 버튼 누르기 함수
function showMenuBtns() {
  // 2-1. menu 배열에서 중복되지 않은 카테고리들 담는 함수
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"] // "all" 카테고리가 초기값
  );

  /* 2-2. 주어진 카테고리를 HTML(button.btn-filter) 형식으로 가공하여 화면에 보여주는 함수
				- categories 배열 원소들을 map 함수를 사용해서 HTML 문자열로 생성
				- join 함수로 배열에 있는 문자열들(모든 카테고리)을 하나의 문자열로 생성
				- 해당 문자열을 .btns-wrap 요소에 삽입
	*/
  const categoryBtns = categories
    .map((category) => {
      return `<button type="button" class="btn-filter" data-id=${category}>${category}</button>`;
    })
    .join("");
  btnsWrap.innerHTML = categoryBtns;

  /* 2-3. 생성된 button.btn-filter에 클릭 이벤트로 필터 기능을 넣은 함수
				- button.btn-filter의 data-id 속성을 가져와서 menu.category와 일치하는 새로운 배열 생성 (filter함수 사용)
				- 카테고리와 문자열 all과 같다면 showMenuItems실행하여 menu 배열 전체 보여주기 OR
					다른 카테고리는 filter 기능으로 새로운 배열 보여주기
	*/
  const filterBtns = btnsWrap.querySelectorAll(".btn-filter");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      // filter 함수에 만족하는 모든 요소를 모아 새 배열로 반환
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        showMenuItems(menu);
      } else {
        showMenuItems(menuCategory);
      }
    });
  });
}
