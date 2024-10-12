let library = [];

const AddBookButton = document.getElementById("addBook");
const bookForm = document.getElementById("book-form");
const closeButton = document.getElementById("close");
const addBook = document.getElementById("submit");
const displayBooks = document.querySelector(".book-card-container");

// Form Input values.
const bookName = document.getElementById("bookname");
const authorName = document.getElementById("authorname");
const noOfPagesContainer = document.getElementById("totalpages");
const haveRead = document.getElementById("read");

// Showing the form when the user clicks on add new books button
const showNewBookButton = () => {
  bookForm.style.display = "flex";
  AddBookButton.style.display = "none";
};

AddBookButton.addEventListener("click", showNewBookButton);

// clear the values
const clearForm = () => {
  bookName.value = "";
  authorName.value = "";
  noOfPagesContainer.value = "";
  haveRead.value = "";
};

const closeform = () => {
  bookForm.style.display = "none";
  AddBookButton.style.display = "flex";
};

closeButton.addEventListener("click", closeform);

// Constructor function.
function Book(nameBook, nameAuthor, pages, read) {
  this.nameBook = nameBook;
  this.nameAuthor = nameAuthor;
  this.pages = pages;
  this.read = read;
}

function AddBookToLibrary() {
  event.preventDefault();
  let BookName = bookName.value;
  let AuthorName = authorName.value;
  let noOfPages = noOfPagesContainer.value;
  let read = haveRead.value;
  if (BookName === "") {
    alert("Please enter the book name: ");
    return;
  }

  if (AuthorName === "") {
    alert("Please enter the author's name: ");
    return;
  }

  const bookInfo = new Book(BookName, AuthorName, noOfPages, read);
  library.push(bookInfo);

  library.forEach((obj) => {
    for (const key in obj) {
      console.log(`${key}: ${obj[key]}`);
    }
  });
  display();
  closeform();
  clearForm();
}
addBook.addEventListener("click", AddBookToLibrary);


const display = () => {
  displayBooks.innerHTML = "";

  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookDetails = `
    <h3>${book.nameBook}</h3>
    <p><strong>Author's name:</strong>${book.nameAuthor}</p>
    <p><strong>Pages: </strong>${book.pages}</p>
    <p><strong>Read: </strong>${book.read}</p>
    <button class="delete" data-index="${index}">Delete</button>`;

    bookCard.innerHTML = bookDetails;
    displayBooks.appendChild(bookCard);
  });


  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(button => {
    button.addEventListener("click", deleteBook)
  })
};

const deleteBook = (event) => {
  const index = event.target.dataset.index;
  library.splice(index, 1);
  display();
}