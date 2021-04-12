import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
    count: number;
    constructor(
        public category: ICategory,
        public name: string,
        public urlName: string,
        public description: string,
        public weight: string,
        public image: Array<string>,
        public price: number
    ) {
        this.count = 1
    }
}