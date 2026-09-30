import { Book } from "./Book.js";
import { ReferenceBook } from "./ReferenceBook.js";
import { Library } from "./Library.js";
const library = new Library([
    new Book("./assets/img/photo_6.jpg", "clean code", "Robert C , Martin", "Programming", true),
    new Book("./assets/img/photo_5.jpg", "Atomic Habits", "James Clear", "Self Development", false),
    new Book("./assets/img/photo_4.jpg", "JavaScripts Basic", "John Smaith", "Programming", true),
    new Book("./assets/img/photo_3.jpg", "Database Design", "Maria Lee", "Database", true),
    new Book("./assets/img/photo_2.jpg", "Htnl & Css", "Sarah wilson", "Web Development", true),
    new ReferenceBook("./assets/img/photo_1.jpg", "TypeScript Handbook", "Microsoft", "Programing", "Shelf A-12", true)
]);
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const totalBooks = document.getElementById("totalBooks");
const availabiltyBooks = document.getElementById("availableBooks");
const addButton = document.getElementById("addButton");
const bookImage = document.getElementById("bookImage");
const titleBook = document.getElementById("titleBook");
const authorBook = document.getElementById("authorBook");
const categoryBook = document.getElementById("categoryBook");
const refernceBook = document.getElementById("refernceBook");
const availableBook = document.getElementById("availableBook");
const cancelButton = document.getElementById("cancelButton");
const formAdd = document.getElementById("addBook");
const overlay = document.getElementById("overlay");
addButton.addEventListener("click", () => {
    formAdd.classList.toggle("show");
    overlay.classList.toggle("show");
    sidebar.classList.add("hide");
});
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    formAdd.classList.remove("show");
    overlay.classList.remove("show");
    sidebar.classList.remove("hide");
});
overlay.addEventListener("click", (e) => {
    e.preventDefault();
    formAdd.classList.remove("show");
    overlay.classList.remove("show");
});
formAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = bookImage.files?.item(0);
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        const imagePath = reader.result;
        let newBook;
        if (refernceBook.value) {
            newBook = new ReferenceBook(imagePath, titleBook.value, authorBook.value, categoryBook.value, refernceBook.value, availableBook.checked);
        }
        else {
            newBook = new Book(imagePath, titleBook.value, authorBook.value, categoryBook.value, availableBook.checked);
        }
        library.addBook(newBook);
        formAdd.reset();
        formAdd.classList.remove("show");
        overlay.classList.remove("show");
        renderStats();
        renderCategories();
        renderBooks();
    };
    reader.readAsDataURL(file);
});
menuButton.addEventListener("click", () => {
    sidebar.classList.add("open");
});
closeButton.addEventListener("click", () => {
    sidebar.classList.remove("open");
});
function renderStats() {
    const books = library.getBooks();
    const available = books.filter((book) => book.getIsAvailable());
    totalBooks.textContent = books.length.toString();
    availabiltyBooks.textContent = available.length.toString();
}
function renderCategories() {
    const currentCategory = categoryFilter.value;
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    library.getCategories().forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    if (library.getCategories().includes(currentCategory)) {
        categoryFilter.value = currentCategory;
    }
    else {
        categoryFilter.value = "all";
    }
}
function getFilterdBooks() {
    const searchQuery = searchInput.value;
    const selectedCategory = categoryFilter.value;
    let books = library.searchBooks(searchQuery);
    if (selectedCategory !== "all") {
        books = books.filter((book) => book.getCategory().toLowerCase() === selectedCategory.toLowerCase());
    }
    return books;
}
function renderBooks() {
    const books = getFilterdBooks();
    booksGrid.innerHTML = "";
    if (books.length === 0) {
        booksGrid.innerHTML = `<div class="empty-message">
        No books found
        </div>`;
        return;
    }
    books.forEach((book) => {
        const card = document.createElement("div");
        card.className = "book-card";
        const availabiltyClass = book.getIsAvailable() ? "available" : "unavailable";
        const availabiltyText = book.getIsAvailable() ? "Available" : "Unavailable";
        card.innerHTML = `<div class="book-header">
                            <img src=${book.getImage()} />
                            </div>
                            <h2 class="title">${book.getTitle()}</h2>
                            <p class="author"><i class="fa-solid fa-user"></i> ${book.getAuthor()}</p>
                            <p class="category"><i class="fa-solid fa-tag"></i>${book.getCategory()}</p>
                            <p class="description">${book.displayInfo()}</p>
                            <span class="status ${availabiltyClass}"><i class="fa-solid fa-circle"></i> ${availabiltyText}</span>
                            <div class="btns"> 
                            <button class="change-button" type="button" data-title="${book.getTitle()}"><i class="fa-solid fa-arrow-right-arrow-left"></i> change status</button>
                            <button class="remove-button" type="button" data-title="${book.getTitle()}">Remove Book</button>
                            </div>
                            `;
        const button = card.querySelector(".change-button");
        button.addEventListener("click", () => {
            const title = button.dataset.title;
            if (title) {
                library.toggleAvailability(title);
                renderStats();
                renderBooks();
            }
        });
        const removeButton = card.querySelector(".remove-button");
        removeButton.addEventListener("click", () => {
            const title = removeButton.dataset.title;
            if (title) {
                library.removeBook(title);
                renderBooks();
                renderCategories();
            }
        });
        booksGrid.appendChild(card);
    });
}
searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);
renderStats();
renderCategories();
renderBooks();
