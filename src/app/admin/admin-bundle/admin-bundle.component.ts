import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BundleService } from 'src/app/shared/services/bundle/bundle.service';

@Component({
  selector: 'app-admin-bundle',
  templateUrl: './admin-bundle.component.html',
  styleUrls: ['./admin-bundle.component.scss']
})
export class AdminBundleComponent implements OnInit {
  breakfastForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  breakfastImage: string;
  imageStatus = false;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private bundleService: BundleService
  ) { }

  ngOnInit(): void {
    this.initBreakfastForm(),
    this.bundleService.getBundle()
  }

  initBreakfastForm(): void {
    this.breakfastForm = this.fb.group({
      price: [null, [Validators.required]],
      firstFood: [null, [Validators.required]],
      secondFood: [null, [Validators.required]],
      dessert: [null, [Validators.required]],
    })
  }

  validByControl(control: string): any {
    if (this.breakfastForm.controls[control].untouched) {
      return true
    }
    return this.breakfastForm.controls[control].valid;
  }

  save(): void{
    console.log(this.breakfastForm.value);
    const bundle = {
      ...this.breakfastForm.value,
      image: this.breakfastImage
    }
    this.bundleService.addBundle(bundle)
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.breakfastImage = url,
        this.imageStatus = true
      })
    })
  }

  deleteImage(urlImage: string): void {
    this.storage.refFromURL(urlImage).delete().subscribe(
      () => {
        this.imageStatus = false;
        this.breakfastImage = null
        this.uploadPercent = null
      },
      err => {
        console.log(err);
      }
    )
  }
}
