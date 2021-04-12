import { ICategory } from "./category.interface";

export interface IProduct {
    category: ICategory;
    name: string;
    urlName: string;
    description: string;
    weight: string;
    image: Array<string>;
    price: number;
    count: number;
    id?: string | number;
}