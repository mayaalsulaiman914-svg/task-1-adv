import { Book } from "./Book.js";
export class ReferenceBook extends Book {
    #locationCode;
    constructor(image, title, author, category, locationCode, isAvailable) {
        super(image, title, author, category, isAvailable);
        this.#locationCode = locationCode;
    }
    getLocationCode() {
        return this.#locationCode;
    }
    displayInfo() {
        return `${super.displayInfo()} - ${this.#locationCode}`;
    }
}
