const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser anda tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function findbook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
    index++;
  }
  return -1;
}
