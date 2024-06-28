const UNCOMPLETE_BOOKSHELF_LIST = "uncompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(
  inputBookTitle,
  inputBookAuthor,
  inputBookYear,
  inputBookIsComplete
) {
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("title");
  bookTitle.innerText = inputBookTitle;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  bookAuthor.innerText = inputBookAuthor;

  const bookYears = document.createElement("p");
  bookYears.classList.add("year");
  bookYears.innerText = inputBookYear;

  const bookIsComplete = completeButton();

  const bookRemove = removeButton();
  bookRemove.innerText = "Hapus";

  const bookManager = document.createElement("div");
  bookManager.classList.add("action");
  if (inputBookIsComplete == true) {
    bookIsComplete.innerText = "Belum selesai";
  } else {
    bookIsComplete.innerText = "Sudah selesai";
  }

  bookManager.append(bookIsComplete, bookRemove);
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");
  bookItem.append(bookTitle, bookAuthor, bookYears, bookManager);

  return bookItem;
}

function createButton(buttonClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function completeButton() {
  return createButton("green", function (event) {
    const parent = event.target.parentElement;
    addBookToComplete(parent.parentElement);
  });
}

function addBook() {
  const uncompleteBookshelfList = document.getElementById(
    UNCOMPLETE_BOOKSHELF_LIST
  );
  const completeBookshelfList = document.getElementById(
    COMPLETE_BOOKSHELF_LIST
  );

  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = parseInt(
    document.getElementById("inputBookYear").value
  );
  const inputBookIsComplete = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const book = makeBook(
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    inputBookIsComplete
  );
  const bookObject = composeBookObject(
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    inputBookIsComplete
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (inputBookIsComplete == false) {
    uncompleteBookshelfList.append(book);
  } else {
    completeBookshelfList.append(book);
  }

  updateDataToStorage();
}

function addBookToComplete(bookElement) {
  const bookTitled = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthored = bookElement.querySelector(".book_item > p").innerText;
  const bookYeared = bookElement.querySelector(".year").innerText;
  const bookIsComplete = bookElement.querySelector(".green").innerText;

  if (bookIsComplete == "Sudah selesai") {
    const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true);

    const book = findbook(bookElement[BOOK_ITEMID]);
    book.isComplete = true;
    newBook[BOOK_ITEMID] = book.id;

    const completeBookshelfList = document.getElementById(
      COMPLETE_BOOKSHELF_LIST
    );
    completeBookshelfList.append(newBook);
  } else {
    const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false);

    const book = findbook(bookElement[BOOK_ITEMID]);
    book.isComplete = false;
    newBook[BOOK_ITEMID] = book.id;
    const uncompleteBookshelfList = document.getElementById(
      UNCOMPLETE_BOOKSHELF_LIST
    );
    uncompleteBookshelfList.append(newBook);
  }
  bookElement.remove();
  updateDataToStorage();
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  if (window.confirm("Apakah anda yakin ingin menghapus buku ini ?")) {
    books.splice(bookPosition, 1);
    bookElement.remove();
    console.log("Data berhasil dihapus");
  }
  updateDataToStorage();
}

function removeButton() {
  return createButton("red", (event) => {
    const parent = event.target.parentElement;
    removeBook(parent.parentElement);
  });
}

function searchBook() {
  const inputSearch = document.getElementById("searchBookTitle").value;
  const moveBook = document.querySelectorAll(".title");

  for (move of moveBook) {
    if (inputSearch !== move.innerText) {
      console.log(move.innerText);
      move.parentElement.remove();
    }
  }
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETE_BOOKSHELF_LIST);
  const listCompleted = document.getElementById(COMPLETE_BOOKSHELF_LIST);

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isComplete
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isComplete == false) {
      listUncompleted.append(newBook);
    } else {
      listCompleted.append(newBook);
    }
  }
}
