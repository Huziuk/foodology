import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  products = []
  newProducts = []
  categories = [];
  selectProd = null;
  subCatForm: FormGroup;
  modalRef: BsModalRef;
  mainCat = 'Main Course';
  countStatus: boolean = true;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.getFireProduct('main course', 'all'),
    this.getFireCategories()
    this.initForm()
  }

  getFireProduct(mainCat: string, cat: string): void{
    this.productService.firebaseCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(data => {
      this.products = data;
      this.products.forEach(p => {
        if (cat.toLowerCase() === 'all' && mainCat.toLowerCase() === p.category.toLowerCase()){
          this.newProducts.push(p)
        } else if (p.subCategory.toLowerCase() === cat.toLowerCase() && mainCat.toLowerCase() === p.category.toLowerCase()){
          this.newProducts.push(p)
        }
      })
      this.selectProd = this.newProducts[0]
    });
  }

  getFireCategories(): void {
    this.categoryService.firebaseCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(data => {
      this.categories = data;
    });
  }

  addToBasket(prod: IProduct): void {
    this.orderService.addProductInBasket(prod)
  }

  changeCount(prod: IProduct, status: boolean): void {
    status ? prod.count++ : prod.count--;
    prod.count <= 1 ? this.countStatus = true : this.countStatus = false;
  }

  selectProduct(prod): void {
    this.selectProd = prod;
  }

  selectCat(): void{
    this.newProducts = []
    this.getFireProduct(this.mainCat, this.subCatForm.value.cat)
  }
  
  selectMainCat(cat: string): void {
    this.mainCat = cat
    this.newProducts = []
    this.getFireProduct(this.mainCat, this.subCatForm.value.cat)
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

  initForm(): void {
    this.subCatForm = this.fb.group({
      cat: ['All', [Validators.required]]
    })
  }

}
