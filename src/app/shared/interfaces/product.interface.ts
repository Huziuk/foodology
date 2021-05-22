import { ICategory } from "./category.interface";

export interface IProduct {
    category: ICategory;
    subCategory: ICategory;
    name: string;
    urlName: string;
    description: string;
    ingredients: string;
    weight: string;
    images: string;
    price: number;
    count: number;
    id?: string;
}