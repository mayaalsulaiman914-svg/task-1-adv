export class Book {
    #image : string;
    #title : string;
    #author : string ;
    #category : string ;
    #isAvailable : boolean ;

    constructor (image : string , title : string , author : string , category : string , isAvailable : boolean) {
        this.#image=image;
        this.#title = title ;
        this.#author = author ;
        this.#category = category;
        this.#isAvailable = isAvailable
    }

    getImage() : string {
        return this.#image
    }
    
    getTitle(): string {
        return this.#title;
    }
    getAuthor() : string {
        return this.#author
    }
    getCategory() : string {
        return this.#category
    }
    getIsAvailable() : boolean {
        return this.#isAvailable
    }
    setAvailability(status : boolean) : void {
        this.#isAvailable = status
    }
    displayInfo() : string {
        return `${this.#title} ${this.#author} ${this.#category}`
    }
}