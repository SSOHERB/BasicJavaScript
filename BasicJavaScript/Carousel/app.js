// 객체 배열 만들기
const reviews = [
  {
    id: 1,
    name: "Author01",
    job: "job1",
    img: "person01.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolore! Quam omnis tenetur doloribus dignissimos ut, placeat ad accusantium vel!",
  },
  {
    id: 2,
    name: "Author02",
    job: "job2",
    img: "person02.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolore! Quam omnis tenetur doloribus dignissimos ut, placeat ad accusantium vel!",
  },
  {
    id: 3,
    name: "Author03",
    job: "job3",
    img: "person03.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolore! Quam omnis tenetur doloribus dignissimos ut, placeat ad accusantium vel!",
  },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const randomBtn = document.querySelector(".btn-random");

// 시작 숫자
let currentItem = 0;

// 처음 load될때 보여지는 기본 슬라이드 정보
window.addEventListener("DOMContentLoaded", () => {
  const item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
});

// 계속 바뀌는 슬라이드 정보
function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

// prev, next buttons
prevBtn.addEventListener("click", () => {
  currentItem--;
  // currentItem이 음수값일 때 방지
  // 슬라이드 무한반복 : 1번 슬라이드에서 '<' 누르면 3번 슬라이드 보이기
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});

nextBtn.addEventListener("click", () => {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});

randomBtn.addEventListener("click", () => {
  // reviews의 배열 길이만큼 랜덤
  currentItem = Math.floor(Math.random() * reviews.length);
  // console.log(currentItem);
  showPerson(currentItem);
});
