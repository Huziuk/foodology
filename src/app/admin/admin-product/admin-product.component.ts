import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

}
