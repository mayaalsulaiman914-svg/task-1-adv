export class Library {
    #books;
    constructor(books) {
        this.#books = [...books];
    }
    getBooks() {
        return [...this.#books];
    }
    getCategories() {
        return [...new Set(this.#books.map((book) => book.getCategory()))];
    }
    addBook(book) {
        this.#books.push(book);
    }
    removeBook(title) {
        const index = this.#books.findIndex((book) => book.getTitle().toLowerCase() === title.toLowerCase());
        if (index === -1) {
            return false;
        }
        this.#books.splice(index, 1);
        return true;
    }
    searchBooks(searchinput) {
        const textSearch = searchinput.trim().toLowerCase();
        if (searchinput === "") {
            return this.getBooks();
        }
        return this.#books.filter((book) => book.getTitle().toLowerCase().includes(searchinput) || book.getAuthor().toLowerCase().includes(searchinput));
    }
    filterByCategory(category) {
        if (category === "all") {
            return this.getBooks();
        }
        return this.#books.filter((book) => book.getCategory().toLowerCase() === category.toLowerCase());
    }
    toggleAvailability(title) {
        const book = this.#books.find((book) => book.getTitle().toLowerCase() === title.toLowerCase());
        if (!book) {
            return false;
        }
        book.setAvailability(!book.getIsAvailable());
        return true;
    }
}
