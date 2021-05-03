import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IBundle } from '../../interfaces/bundle.interface';
import { IOrder } from '../../interfaces/order.interface';
import { IProduct } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService
  ) { }
  
  fireOrder(): AngularFirestoreCollection<IOrder> {
    return this.db.collection('orders')
  }

  addProductInBasket(prod: IProduct | IBundle): void {
    let products: Array<IProduct | IBundle> = [];
    if (localStorage.getItem('basket')){
      products = JSON.parse(localStorage.getItem('basket'))
      if(products.some(product => product.id === prod.id)){
        const INDEX = products.findIndex(product => product.id === prod.id)
        products[INDEX].count += prod.count;
      } 
      else products.push(prod)
    } else {
      products.push(prod)
    }
    this.toastr.success('Product add to basket')
    localStorage.setItem('basket', JSON.stringify(products))
  }

  deleteProductInBasket(prod: IProduct): void {
    let products: Array<IProduct> = []
    products = JSON.parse(localStorage.getItem('basket'))
    products.splice(products.findIndex(p => p.id === prod.id), 1)
    localStorage.setItem('basket', JSON.stringify(products))
  }

}
