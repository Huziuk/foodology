import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Array<any>;
  modalRef: BsModalRef;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(): void {
    this.orderService.fireOrder().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    })
  }

  deleteOrder(order: IOrder): void {
    this.orderService.fireOrder().doc(order.id).delete()
      .then(() => {
        this.getOrders()
      })
      .catch(err => {
        console.log(err);
      })
    this.modalService.hide()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
