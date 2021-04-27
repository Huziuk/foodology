import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IProduct } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFirestore
  ) { }

  firebaseCategories(): AngularFirestoreCollection<IProduct> {
    return this.db.collection('products')
  }
}
