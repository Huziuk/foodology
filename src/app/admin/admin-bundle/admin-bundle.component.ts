import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBundle } from 'src/app/shared/interfaces/bundle.interface';
import { Bundle } from 'src/app/shared/models/bundle.model';
import { BundleService } from 'src/app/shared/services/bundle/bundle.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-bundle',
  templateUrl: './admin-bundle.component.html',
  styleUrls: ['./admin-bundle.component.scss']
})
export class AdminBundleComponent implements OnInit {
  bundles: Array<any> = []
  bundleForm: FormGroup;
  formName: string = 'Breakfast';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imageUrl: string;
  imageStatus = false;
  bundleID: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private bundleService: BundleService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getFireBundle()
  }

  getFireBundle(): void {
    this.bundleService.firebaseBundle().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(data => {
      this.bundles = data;
      this.changeForm(this.formName)
    });
  }

  save(): void {
    const bun = {
      ...this.bundleForm.value,
      category: this.formName,
      image: this.imageUrl,
      id: this.bundleID
    }
    this.bundleService.firebaseBundle().doc(this.bundleID).update(bun).then(
      () => {this.getFireBundle()},
      err => {console.log(err)}
    )
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.imageUrl = url
        this.imageStatus = true
      })
    })
  }
  
  //deleteImage(urlImage: string): void {
  //  this.storage.refFromURL(urlImage).delete().subscribe(
  //    () => {
  //      this.uploadPercent = null
  //    },
  //    err => {
  //      console.log(err);
  //    }
  //  )
  //}

  validByControl(control: string): any {
    if (this.bundleForm.controls[control].untouched) {
      return true
    }
    return this.bundleForm.controls[control].valid;
  }

  initForm(): void {
    this.bundleForm = this.fb.group({
      price: [null, [Validators.required]],
      firstFood: [null, [Validators.required]],
      secondFood: [null, [Validators.required]],
      dessert: [null, [Validators.required]],
    })
  }

  changeForm(name: string): void {
    this.formName = name;
    this.bundles.forEach(bun => {
      if (bun.category === this.formName){
        this.bundleForm = this.fb.group({
          price: [bun.price, [Validators.required]],
          firstFood: [bun.firstFood, [Validators.required]],
          secondFood: [bun.secondFood, [Validators.required]],
          dessert: [bun.dessert, [Validators.required]],
        })
        this.imageUrl = bun.image;
        this.imageStatus = true;
        this.bundleID = bun.id;
      }
    })
  }

}
