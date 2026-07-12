let reviewBoxStart = document.getElementById("review-box-start");
let reviewBoxEnd = document.getElementById("review-box-end");
let listingBox = document.getElementById("listing-box");
let bookingBox = document.getElementById("booking-box");

let listBtn = document.querySelector(".choose-list #listBtn");
let reviBtn = document.querySelector(".choose-list #reviBtn");
let bookBtn = document.querySelector(".choose-list #bookBtn");

listBtn.addEventListener("click", () => {
  reviewBoxStart.style.display = "none";
  reviewBoxEnd.style.display = "inline";
  listingBox.style.display = "block";
  bookingBox.style.display = "none";
});

reviBtn.addEventListener("click", () => {
  reviewBoxStart.style.display = "inline";
  reviewBoxEnd.style.display = "none";
  listingBox.style.display = "block";
  bookingBox.style.display = "none";
});

bookBtn.addEventListener("click", () => {
  reviewBoxStart.style.display = "none";
  reviewBoxEnd.style.display = "none";
  listingBox.style.display = "none";
  bookingBox.style.display = "block";
});
