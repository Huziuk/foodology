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
  categories: Array<any> = []
  productForm: FormGroup;
  images: Array<string> = [
    //'https://firebasestorage.googleapis.com/v0/b/foodology-b42eb.appspot.com/o/images%2Fterris-crispy-fried-chicken-legs-3056879-10_preview-5b05ec40a474be00362260d7.jpeg?alt=media&token=53443cf3-873c-4880-982f-9526f246e54a',
    //'https://firebasestorage.googleapis.com/v0/b/foodology-b42eb.appspot.com/o/images%2Fimage.jpg?alt=media&token=b1ebb261-ea34-4112-99a3-f651ec353282',
    //'https://firebasestorage.googleapis.com/v0/b/foodology-b42eb.appspot.com/o/images%2FGrilled-BBQ-Chicken-SpendWithePennies-4.jpg?alt=media&token=8da5c05c-545e-4d3a-b96a-10c1883c95fd',
    //'https://firebasestorage.googleapis.com/v0/b/foodology-b42eb.appspot.com/o/images%2FAutoportrait_de_Vincent_van_Gogh.jpg?alt=media&token=67a217e8-7359-4c68-91c9-5f14a678fc20',
  ]
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  modalRef: BsModalRef;
  editID: string;
  editStatus = false;
  categorySelect = document.getElementById('category') as HTMLSelectElement;
  subCategorySelect = document.getElementById('subCategory') as HTMLSelectElement;

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
    });
  }

  addFireProduct(): void {
    let prod = {
      ...this.productForm.value,
      images: this.images,
      //category: 'Main Course',
      //subCategory: this.categories[0],
    }
    console.log(prod);
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
    console.log(this.categorySelect);
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
      images: this.images
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

  deletaFireProduct(prod: IProduct): void {
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

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.images.push(url)
      })
    })
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
    this.images = [];
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
    return this.images.length === 4;
  }

}
