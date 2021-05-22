import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
    count: number;
    constructor(
        public category: ICategory,
        public subCategory: ICategory,
        public name: string,
        public urlName: string,
        public description: string,
        public ingredients: string,
        public weight: string,
        public images: string,
        public price: number
    ) {
        this.count = 1
    }
}