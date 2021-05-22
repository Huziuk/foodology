import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  @ViewChild("template") private template: TemplateRef<Object>;
  products: Array<any>
  filterProducts: Array<IProduct>
  categories: Array<any> = []
  productForm: FormGroup;
  images: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  modalRef: BsModalRef;
  editID: string;
  editStatus = false;
  searchName: string;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getFireCategories();
    this.getFireProducts();
  }


  getFireProducts(): void {
    this.productService.firebaseCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(data => {
      this.products = data;
      this.filterProducts = this.products
    });
  }

  addFireProduct(): void {
    let prod = {
      ...this.productForm.value,
      images: this.images,
      count: 1
    }
    this.productService.firebaseCategories().add(prod)
      .then(() => {
        this.getFireProducts()
        this.modalRef.hide()
        this.toastr.success('Add product success!')
      })
      .catch(err => {
        this.modalRef.hide()
        this.toastr.error('Add product error!')
        console.log(err);
      })
    this.productForm.reset()
    this.images = null
  }

  editFireProduct(prod: IProduct): void {
    this.openModal(this.template)
    this.productForm = this.fb.group({
      name: [prod.name, [Validators.required]],
      price: [prod.price, [Validators.required]],
      weight: [prod.weight, [Validators.required]],
      description: [prod.description, [Validators.required]],
      ingredients: [prod.ingredients, [Validators.required]],
      category: [prod.category, [Validators.required]],
      subCategory: [prod.subCategory, [Validators.required]],
    })
    this.images = prod.images
    this.editID = prod.id
    this.editStatus = true;
  }

  saveFireProduct(): void {
    let prod = {
      ...this.productForm.value,
      images: this.images,
      count: 1
    }
    this.productService.firebaseCategories().doc(this.editID).update(prod)
    .then(() => {
      this.getFireProducts()
      this.toastr.success('Edit product success')
    })
    .catch(err => {
      console.log(err);
      this.toastr.error('Edit product error')
    })
    this.modalRef.hide()
    this.productForm.reset()
    this.images = null
    this.editID = null
    this.editStatus = false;
  }

  deleteFireProduct(prod: IProduct): void {
    this.productService.firebaseCategories().doc(prod.id).delete()
      .then(() => {
        this.getFireProducts()
        this.toastr.success('Delete product success!');
      })
      .catch(err => {
        console.log(err);
        this.toastr.success('Delete product error!');
      })
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

  searchProduct(): void {
    this.filterProducts = this.products.filter((prod: IProduct) => prod.name.toLowerCase().indexOf(this.searchName.toLowerCase()) != -1);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.images = url
      })
    })
  }

  deleteImage(url: string): void {
    this.storage.refFromURL(url).delete().subscribe(
      () => {
        this.images = null
      },
      err => {
        console.log(err);
      }
    )
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      description: [null, [Validators.required]],
      ingredients: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
    })
  }

  validByControl(control: string): any {
    if (this.productForm.controls[control].untouched) {
      return true
    }
    return this.productForm.controls[control].valid;
  }

  openModal(template: TemplateRef<any>) {
    this.productForm.reset()
    this.images = null;
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-xl')
    let modalContent = document.querySelector('.modal-content') as HTMLElement
    modalContent.style.cssText =
      `
      border: none;
      border-radius: 20px;
    `
  }

  checkUpload(): boolean {
    if(this.images) {
      return true
    }
    return false
  }

}
