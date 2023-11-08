class DOM {
    static bookContainer = document.querySelector("div.book-container");
    static bookTemplate = document.querySelector("template#book-template");
    static addBookCard = document.querySelector("div.add-book");

    static addBookForm = {
        form: document.querySelector("form#add-book"),
        title: document.querySelector("form#add-book input#title"),
        author: document.querySelector("form#add-book input#author"),
        year: document.querySelector("form#add-book input#year"),
        read: document.querySelector("form#add-book input#read"),
        button: document.querySelector("form#add-book button"),
    }
}

class Book {
    title = "Unknown";
    author = "Unknown";
    year = "Unknown";
    #bRead = false;

    constructor(title, author, year, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.#bRead = read;
    }

    invertReadState() {
        this.#bRead = !this.#bRead;
    }

    getReadString() {
        return this.#bRead ? "Read ✔" : "Not read ✘";
    }
}

(function Launch() {
    const myLibrary = [];

    const addBookToLibrary = (title, author, year, read) => {
        const newBook = new Book(title, author, year, read);
        myLibrary.push(newBook);

        const filledTemplate = getFilledTemplate();
        DOM.bookContainer.insertBefore(filledTemplate, DOM.addBookCard);
        const bookInDOM = DOM.addBookCard.previousElementSibling;

        bookInDOM.querySelector("span#read.value").addEventListener("click", (event) => {
            newBook.invertReadState();
            event.target.textContent = newBook.getReadString();
        })

        bookInDOM.querySelector("img.minus-icon").addEventListener("click", () => {
            bookInDOM.remove();
            myLibrary.splice(myLibrary.indexOf(newBook), 1);
        });

        function getFilledTemplate() {
            const template = DOM.bookTemplate.content.cloneNode(true);
            template.querySelector("span#title.value").textContent = newBook.title;
            template.querySelector("span#author.value").textContent = newBook.author;
            template.querySelector("span#year.value").textContent = newBook.year;
            template.querySelector("span#read.value").textContent = newBook.getReadString();
            return template;
        }
    }

    DOM.addBookForm.button.addEventListener("click", () => {
        addBookToLibrary(DOM.addBookForm.title.value,
                         DOM.addBookForm.author.value,
                         DOM.addBookForm.year.value,
                         DOM.addBookForm.read.checekd);
        DOM.addBookForm.form.reset();
    })

    addBookToLibrary("Philosopher's Stone", "J. K. Rowling", 1997, true);
    addBookToLibrary("Chamber of Secrets", "J. K. Rowling", 1998, true);
    addBookToLibrary("Prisoner of Azkaban", "J. K. Rowling", 1999, false);
    addBookToLibrary("Goblet of Fire", "J. K. Rowling", 2000, false);
})();