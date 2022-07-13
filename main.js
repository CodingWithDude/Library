class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0"
    // readState = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    // this.readState = readState;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
}

const library = new Library();

// User Interface
const submit = document.getElementById("submit");
const bookContainer = document.getElementById("bookContainer");

const getBookFromInput = () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const book = new Book(title.value, author.value, pages.value);

  title.value = "";
  author.value = "";
  pages.value = "";

  return book;
};

const addBook = () => {
  // Toggling .invalidInput for css error highlighting
  if (title.value === "") {
    title.classList.add("invalidInput");
  } else {
    title.classList.remove("invalidInput");
  }
  if (author.value === "") {
    author.classList.add("invalidInput");
  } else {
    author.classList.remove("invalidInput");
  }
  if (pages.value === "") {
    pages.classList.add("invalidInput");
  } else {
    pages.classList.remove("invalidInput");
  }
  // Adding book
  if (title.value !== "" && author.value !== "" && pages.value !== "") {
    const newBook = getBookFromInput();
    library.addBook(newBook);
    updateBookContainer();
    console.log(library);
  }
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  library.removeBook(title);
  updateBookContainer();
  console.log(library);
};

const updateBookContainer = () => {
  resetBookContainer();
  for (let book of library.books) {
    newBookCard(book);
  }
};

const resetBookContainer = () => {
  bookContainer.innerHTML = "";
};

const newBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonContainer = document.createElement("div");
  const removeBtn = document.createElement("button");

  removeBtn.onclick = removeBook;

  title.textContent = `"${book.title}"`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonContainer.appendChild(removeBtn);
  bookCard.appendChild(buttonContainer);
  bookContainer.appendChild(bookCard);
};

submit.onclick = addBook;
