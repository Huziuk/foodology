import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders-archive',
  templateUrl: './admin-orders-archive.component.html',
  styleUrls: ['./admin-orders-archive.component.scss']
})
export class AdminOrdersArchiveComponent implements OnInit {
  archiveOrders: Array<any>;
  modalRef: BsModalRef;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getArchiveOrders()
  }

  getArchiveOrders(): void {
    this.orderService.fireArchiveOrder().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(
      data => {
        this.archiveOrders = data;
        console.log(this.archiveOrders);
      },
      err => {
        console.log(err);
      })
  }

  deleteOrder(order: IOrder): void {
    this.orderService.fireArchiveOrder().doc(order.id).delete()
      .then(() => {
        console.log(order);
        this.getArchiveOrders()
        this.modalService.hide()
      })
      .catch(err => {
        console.log(err);
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
