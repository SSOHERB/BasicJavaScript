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
  // array.reduce(콜백함수(accumulate, currentValue)) : 현재값 누적해서 최종값 반환
  const categories = menu.reduce(
    // values 누적된 값, item 현재 순회 중인 배열 요소
    function (values, item) {
      // 최종 배열에 category값이 없다면, 값 넣기
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"] // "all" 버튼이 초기값
  );

  // reduce 함수로 반환된 배열에 map함수로 값 리턴
  const categoryBtns = categories
    .map((category) => {
      return `<button type="button" class="btn-filter" data-id=${category}>${category}</button>`;
    })
    .join("");
  btnsWrap.innerHTML = categoryBtns;

  // 생성된 각각의 button에 이벤트 걸기
  const filterBtns = btnsWrap.querySelectorAll(".btn-filter");
  // console.log(filterBtns);

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      // console.log(category);
      /* filter 함수에 만족하는 모든 요소를 모아 새 배열로 반환 
				=> menu 배열에서 category 속성과 상수 category(btn-filter의 data-id)가 같으면
			*/
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
