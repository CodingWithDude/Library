class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    readState = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.inLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  inLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

// User Interface
const submitBtn = document.getElementById("submitBtn");
const bookContainer = document.getElementById("bookContainer");
const errorMsg = document.getElementById("errorMsg");
const collapsibleToggle = document.getElementById("addBooks");

const getBookFromInput = () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");

  const book = new Book(
    title.value,
    author.value,
    pages.value,
    this.readState.checked
  );

  return book;
};

const addBook = () => {
  // Toggle collapsible input field
  collapsibleToggle.classList.remove("collapsible");
  // Toggling .invalidInput for css error highlighting
  if (collapsibleToggle.classList.contains("errorCheck")) {
    if (pages.value === "") {
      pages.classList.add("invalidInput");
      errorMsg.innerText = "Missing Pages";
    } else {
      pages.classList.remove("invalidInput");
    }
    if (author.value === "") {
      author.classList.add("invalidInput");
      errorMsg.innerText = "Missing Author";
    } else {
      author.classList.remove("invalidInput");
    }
    if (title.value === "") {
      title.classList.add("invalidInput");
      errorMsg.innerText = "Missing Title";
    } else {
      title.classList.remove("invalidInput");
    }
  }

  collapsibleToggle.classList.add("errorCheck");
  // Adding book
  if (title.value !== "" && author.value !== "" && pages.value !== "") {
    const newBook = getBookFromInput();

    // Check to see if book title is already in library
    if (library.inLibrary(newBook)) {
      errorMsg.innerText = `"${title.value}" already in Library`;
      title.classList.add("invalidInput");
      return;
    } else {
      library.addBook(newBook);
      updateBookContainer();

      // Reset Error Message and Inputs and Classes
      errorMsg.innerText = "";
      title.value = "";
      author.value = "";
      pages.value = "";
      readState.checked = false;
      collapsibleToggle.classList.add("collapsible");
      collapsibleToggle.classList.remove("errorCheck");
    }
  }
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  library.removeBook(title);
  updateBookContainer();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  const book = library.getBook(title);
  book.readState = !book.readState;
  updateBookContainer();
};

const updateBookContainer = () => {
  resetBookContainer();
  for (let book of library.books) {
    newBookCard(book);
  }
  console.log(library);
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
  const readBtn = document.createElement("button");

  bookCard.classList.add("bookCard");
  buttonContainer.classList.add("buttonContainer");
  removeBtn.classList.add("removeBtn");
  readBtn.classList.add("readBtn");

  removeBtn.onclick = removeBook;
  readBtn.onclick = toggleRead;

  title.textContent = `"${book.title}"`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.readState === false) {
    readBtn.innerText = "Not Read";
    readBtn.classList.remove("read-style");
  } else {
    readBtn.innerHTML = "Read";
    readBtn.classList.add("read-style");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonContainer.appendChild(removeBtn);
  buttonContainer.appendChild(readBtn);
  bookCard.appendChild(buttonContainer);
  bookContainer.appendChild(bookCard);
};

submitBtn.onclick = addBook;

// Default Books
theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
braveNewWorld = new Book("Brave New World", "Aldous Huxley", "288", false);
starshipTroopers = new Book(
  "Starship Troopers",
  "Robert A. Heinlein",
  "263",
  true
);

library.addBook(theHobbit);
library.addBook(braveNewWorld);
library.addBook(starshipTroopers);

updateBookContainer();
