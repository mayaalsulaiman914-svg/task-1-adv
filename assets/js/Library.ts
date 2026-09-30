import {Book} from "./Book.js"

export class Library {
    #books : Book[];
    constructor(books : Book[]) {
        this.#books = [...books]
    }

    getBooks(): Book[] {
     return [...this.#books]
    }
    getCategories() : string[] {
        return [...new Set(this.#books.map((book) => book.getCategory()))]
    }

    addBook(book : Book) : void {
        this.#books.push(book)
    }
    removeBook(title : string) : boolean {
        const index = this.#books.findIndex((book) => book.getTitle().toLowerCase() === title.toLowerCase())
        if(index === -1) {
            return false
        }
        this.#books.splice(index , 1)
        return true
    }
    searchBooks(searchinput : string) : Book[] {
        const textSearch = searchinput.trim().toLowerCase();
        if(searchinput === "") {
            return this.getBooks()
        }
        return this.#books.filter((book) => book.getTitle().toLowerCase().includes(searchinput) || book.getAuthor().toLowerCase().includes(searchinput))
    }
    filterByCategory(category : string) : Book[] {
        if(category === "all") {
            return this.getBooks()
        }
        return this.#books.filter((book) => book.getCategory().toLowerCase() === category.toLowerCase())
    }
    toggleAvailability(title: string) : boolean {
        const book = this.#books.find((book) => book.getTitle().toLowerCase() === title.toLowerCase())
        if(!book) {
            return false
        }
        book.setAvailability(!book.getIsAvailable())
        return true
    }

}