import { IBundle } from "../interfaces/bundle.interface";

export class Bundle implements IBundle {
    constructor(
        public price: number,
        public firstFood: string,
        public secondFood: string,
        public dessert: string,
        public image: string,
        public category: string,
        public id?: string | number
    ) { }
}