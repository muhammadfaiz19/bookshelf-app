const submitBook = document.getElementById("inputBook");

document.addEventListener("DOMContentLoaded", function () {
  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });


  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data Berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

function changeText() {
  const checkbox = document.getElementById("inputBookIsComplete");
  const textChange = document.getElementById("textChange");

  if (checkbox.checked == true) {
    textChange.innerText = "Sudah Selesai Dibaca";
  } else {
    textChange.innerText = "Belum Selesai Dibaca";
  }
}

function onlyNum(object) {
  if (object.value.length > 4) {
    object.value = object.value.slice(0, 4);
  }
}


