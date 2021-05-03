import { IBundle } from "../interfaces/bundle.interface";

export class Bundle implements IBundle {
    count: number
    constructor(
        public price: number,
        public firstFood: string,
        public secondFood: string,
        public dessert: string,
        public images: string,
        public category: string,
        public name: string,
        public id?: string | number
    ) {
        this.count = 1;
    }
}