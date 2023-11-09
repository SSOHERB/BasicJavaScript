const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

// ## .nav-toggle(햄버거 메뉴) 클릭시, show-links 추가
navToggle.addEventListener("click", () => {
  /*   console.log(links.classList);
  console.log(links.classList.contains("links")); */

  /* if (links.classList.contains("show-links")) {
    links.classList.remove("show-links");
  } else {
    links.classList.add("show-links");
  } */

  links.classList.toggle("show-links");
});
