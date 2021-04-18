import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

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
  ) { }
  
  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void{
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      urlName: [null, [Validators.required]],
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

    this.categoryService.firebaseCategories()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}



