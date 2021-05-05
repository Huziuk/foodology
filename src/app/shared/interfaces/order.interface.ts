import { IBundle } from "./bundle.interface";
import { IProduct } from "./product.interface";

export interface IOrder {
    name: string
    phone: number
    address: string
    id?: string
    products: Array<IProduct | IBundle>
}