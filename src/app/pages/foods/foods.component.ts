import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) { }
  
  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-xl')
    let modalContent = document.querySelector('.modal-content') as HTMLElement
    modalContent.style.cssText =
    `
      border: none;
      border-radius: 50px;
    `
  }


}
