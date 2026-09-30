export class Book {
    #image;
    #title;
    #author;
    #category;
    #isAvailable;
    constructor(image, title, author, category, isAvailable) {
        this.#image = image;
        this.#title = title;
        this.#author = author;
        this.#category = category;
        this.#isAvailable = isAvailable;
    }
    getImage() {
        return this.#image;
    }
    getTitle() {
        return this.#title;
    }
    getAuthor() {
        return this.#author;
    }
    getCategory() {
        return this.#category;
    }
    getIsAvailable() {
        return this.#isAvailable;
    }
    setAvailability(status) {
        this.#isAvailable = status;
    }
    displayInfo() {
        return `${this.#title} ${this.#author} ${this.#category}`;
    }
}
