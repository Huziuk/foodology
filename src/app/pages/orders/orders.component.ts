import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBundle } from 'src/app/shared/interfaces/bundle.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  products: Array<IProduct | IBundle> = [];
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

  sendOrder(): void{
    const { name, phone, address } = this.orderForm.value
    //const order: IOrder = new Order(name, phone, address, this.products)
    const order = {
      name: name,
      phone: phone,
      address: address,
      products: this.products,
    }
    console.log(order);
    this.orderService.fireOrder().add(order)
      .then(() => {
        this.products = []
        localStorage.removeItem('basket')
        this.checkBasket()
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  checkBasket(){
    this.products.length ? this.emptyBasket = false : this.emptyBasket = true
  }

  getLocalProduct(): void {
    this.products = JSON.parse(localStorage.getItem('basket'))
    this.totalPrice = 0;
    if(this.products){
      this.products.forEach(p => this.totalPrice += p.price * p.count)
      this.checkBasket()
    } else {
      this.emptyBasket = true
    }
  }

  deleteLocalProduct(prod: IProduct): void {
    this.orderService.deleteProductInBasket(prod)
    this.getLocalProduct()
    this.checkBasket()
  }

  validByControl(control: string): any {
    if (this.orderForm.controls[control].untouched) {
      return true
    }
    return this.orderForm.controls[control].valid;
  }

  initForm(): void {
    if (localStorage.getItem('user')){
      const user: IUser = JSON.parse(localStorage.getItem('user'))
      let name = `${user.firstName} ${user.lastName}`
      name == ' ' ? name = '' : name 
      this.orderForm = this.fb.group({
        name: [name, [Validators.required, Validators.pattern('^[a-zA-z ]{3,36}$')]],
        address: [null, [Validators.required]],
        phone: [user.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        cardNumber: [user.cardNumber, [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        cardDate: [user.cardDate, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      })
    } else {
      this.orderForm = this.fb.group({
        name: [null, [Validators.required, Validators.pattern('^[a-zA-z ]{3,36}$')]],
        address: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        cardNumber: [null, [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        cardDate: [null, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      })
    }
  }

}