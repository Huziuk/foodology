import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  products: Array<IProduct> = [];
  totalPrice = 0;
  orderForm: FormGroup;
  emptyBasket: boolean;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getLocalProduct()
    this.initForm()
  }
  
  checkBasket(){
    this.products.length ? this.emptyBasket = false : this.emptyBasket = true
  }

  getLocalProduct(): void {
    this.products = JSON.parse(localStorage.getItem('basket'))
    this.totalPrice = 0;
    this.products.forEach(p => this.totalPrice += p.price * p.count)
    this.checkBasket()
  }

  deleteLocalProduct(prod: IProduct): void {
    this.orderService.deleteProductInBasket(prod)
    this.getLocalProduct()
    this.checkBasket()
  }

  initForm(): void {
    if (localStorage.getItem('user')){
      const user: IUser = JSON.parse(localStorage.getItem('user'))
      const name = user.firstName + ' ' + user.lastName
      this.orderForm = this.fb.group({
        name: [name, [Validators.required]],
        address: [null, [Validators.required]],
        phone: [user.phone, [Validators.required]],
        cardNumber: [user.cardNumber, [Validators.required]],
        cardDate: [user.cardDate, [Validators.required]],
      })
    } else {
      this.orderForm = this.fb.group({
        name: [null, [Validators.required]],
        address: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        cardNumber: [null, [Validators.required]],
        cardDate: [null, [Validators.required]],
      })
    }
  }

}

//document.getElementById('phone').addEventListener('blur', function (e) {
//  var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
//  e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
//});