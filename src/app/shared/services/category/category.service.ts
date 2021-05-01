import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ICategory } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  firebaseCategories(): AngularFirestoreCollection<ICategory> {
    return this.db.collection('category')
  }

}
