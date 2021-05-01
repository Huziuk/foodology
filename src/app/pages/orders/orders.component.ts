import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  products: Array<IProduct> = []

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getLocalProduct()
  }

  getLocalProduct(): void {
    this.products = JSON.parse(localStorage.getItem('basket'))
  }

  deleteLocalProduct(prod: IProduct): void {
    this.orderService.deleteProductInBasket(prod)
    this.getLocalProduct()
  }

}
