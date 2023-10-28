const myLibrary = [];
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
const addBookCard = document.querySelector("div.add-book");

form.button.addEventListener("click", () => {
    addBookToLibrary(form.title.value,
                    form.author.value,
                    form.year.value,
                    form.read.checked);
    form.form.reset();
})

addBookToLibrary("Philosopher's Stone", "J. K. Rowling", 1997, true);
addBookToLibrary("Chamber of Secrets", "J. K. Rowling", 1998, true);
addBookToLibrary("Prisoner of Azkaban", "J. K. Rowling", 1999, false);
addBookToLibrary("Goblet of Fire", "J. K. Rowling", 2000, false);

function addBookToLibrary(title, author, year, bRead) {
    const newBook = new Book(title, author, year, bRead);
    myLibrary.push(newBook);
}

function Book(title, author, year, bRead) {
    if (!(this instanceof Book)) {
        throw Error('Error: should be invoked as object constructor');
    }
    setInternalValues.call(this);

    const clone = bookTemplate.content.cloneNode(true);
    populateCloneDetails.call(this, clone);
    const bookInstance = insertCloneIntoDOM(clone);
    bookInstance.querySelector("img.minus-icon").addEventListener("click", () => {
        bookInstance.remove();
        
        const ind = myLibrary.indexOf(this);
        myLibrary.splice(ind, 1);
    });

    function setInternalValues() {
        this.title = title ? title : "Unknown";
        this.author = author ? author : "Unknown";
        this.year = year ? Number(year) : "Unknown";
        this.read = bRead ? true : false;
    }

    function populateCloneDetails(clone) {
        clone.querySelector("span#title.value").textContent = this.title;
        clone.querySelector("span#author.value").textContent = this.author;
        clone.querySelector("span#year.value").textContent = this.year;
        clone.querySelector("span#read.value").textContent = this.read ? "Read ✔" : "Not Read"
    }

    function insertCloneIntoDOM(clone) {
        bookContainer.insertBefore(clone, addBookCard);
        return addBookCard.previousElementSibling;
    }
}

