import { IBundle } from "../interfaces/bundle.interface";
import { IOrder } from "../interfaces/order.interface";
import { IProduct } from "../interfaces/product.interface";

export class Order implements IOrder {
    constructor(
        public name: string,
        public phone: number,
        public address: string,
        public products: Array<IProduct | IBundle>
    ){}
}