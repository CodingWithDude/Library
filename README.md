# Library

Library Project for The Odin Project

function Book(title, author, pages) {
this.title = title;
this.author = author;
this.pages = pages;
}

// Create New Books
submit.addEventListener("click", () => {
if (title.value !== "" && author.value !== "" && pages.value !== "") {
let book = new Book(title.value, author.value, pages.value);
myLibrary.push(book);
generateBookCard(book);
title.value = "";
author.value = "";
pages.value = "";
}
});

// Remove Books

function generateBookCard(book) {
const card = document.createElement("div");
card.classList.add("card");
card.dataset.index = index;
const remove = document.createElement("button");
remove.classList.add("remove");
remove.dataset.index = index;
remove.innerText = "remove";
books.appendChild(card);
for (let key in book) {
const para = document.createElement("p");
para.textContent = `${key}: ${book[key]}`;
card.appendChild(para);
}
card.appendChild(remove);

index += 1;
console.log(myLibrary);
}
