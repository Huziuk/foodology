import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<any> = []
  categoryForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFireCategories()
    this.initForm()
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
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

  addFireCategories(): void {
    if(this.categoryForm.valid){
      let category = {
        name: this.categoryForm.value.name,
      }
      this.categoryService.firebaseCategories().add(category).then(
        () => {
          this.modalRef.hide()
          this.categoryForm.reset()
          this.toastr.success('Add category success')
          this.getFireCategories()
        },
        err => {
          this.toastr.error('Add category error')
          console.log(err);
        }
      )
    }
  }

  deleteFireCategories(id: string): void {
    this.categoryService.firebaseCategories().doc(id).delete()
      .then(() => {
        this.getFireCategories()
        this.toastr.success('Delete category success')
      })
      .catch(err => {
        this.toastr.error('Delete category error')
        console.log(err)
      })
  }

  validByControl(control: string): any {
    if (this.categoryForm.controls[control].untouched) {
      return true
    }
    return this.categoryForm.controls[control].valid;
  }

  openModal(template: TemplateRef<any>) {
    this.categoryForm.reset()
    this.modalRef = this.modalService.show(template);
    let modalContent = document.querySelector('.modal-content') as HTMLElement
    modalContent.style.cssText =
      `
      border: none;
      border-radius: 20px;
    `
  }

}



