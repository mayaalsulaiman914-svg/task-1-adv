import {Book} from "./Book.js";

export class ReferenceBook extends Book {
#locationCode : string ;

constructor(image : string ,title : string , author: string , category : string , locationCode : string , isAvailable : boolean) {
    super(image ,title , author , category , isAvailable);
    this.#locationCode = locationCode
}
getLocationCode() : string {
    return this.#locationCode;
}
override displayInfo(): string {
    return `${super.displayInfo()} - ${this.#locationCode}`
}
}
