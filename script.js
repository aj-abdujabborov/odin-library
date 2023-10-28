const myLibrary = [];
let bookNum = 0;

const form = {
    form: document.querySelector("form#add-book"),
    title: document.querySelector("form#add-book input#title"),
    author: document.querySelector("form#add-book input#author"),
    year: document.querySelector("form#add-book input#year"),
    read: document.querySelector("form#add-book input#read"),
    button: document.querySelector("form#add-book button"),
};

const bookContainer = document.querySelector("div.book-container");
const bookTemplate = document.querySelector("template#book-template");

form.button.addEventListener("click", () => {
    addBookToLibrary(form.title.value,
                    form.author.value,
                    form.year.value,
                    form.read.checked);
    form.form.reset();
})

addBookToLibrary("Philosopher's Stone", "J. K. Rowling", 1997, false);
addBookToLibrary("Chamber of Secrets", "J. K. Rowling", 1998, false);
addBookToLibrary("Prisoner of Azkaban", "J. K. Rowling", 1999, false);
addBookToLibrary("Goblet of Fire", "J. K. Rowling", 2000, false);

function Book(title, author, year, bRead) {
    if (!(this instanceof Book)) {
        throw Error('Error: should be invoked as object constructor');
    }

    this.title = title ? title : "Unknown";
    this.author = author ? author : "Unknown";
    this.year = year ? Number(year) : "Unknown";
    this.read = bRead ? true : false;

    // render
    const clone = bookTemplate.content.cloneNode(true);
    const titleValue = clone.querySelector("span#title.value");
    const authorValue = clone.querySelector("span#author.value");
    const yearValue = clone.querySelector("span#year.value");
    const readValue = clone.querySelector("span#read.value");
    const removeButton = clone.querySelector("img.minus-icon");

    titleValue.textContent = this.title;
    authorValue.textContent = this.author;
    yearValue.textContent = this.year;
    readValue.textContent = this.read;
    bookContainer.appendChild(clone);
    const thisBook = bookContainer.lastElementChild;

    // removal
    removeButton.addEventListener("click", () => {
        thisBook.remove();
        
        const ind = myLibrary.indexOf(this);
        myLibrary.splice(ind, 1);
    });
}

function addBookToLibrary(title, author, year, bRead) {
    const newBook = new Book(title, author, year, bRead);
    myLibrary.push(newBook);
}
