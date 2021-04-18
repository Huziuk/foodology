import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IBundle } from '../../interfaces/bundle.interface';

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  constructor(
    private db: AngularFirestore,
  ) { }

  firebaseBundle(): AngularFirestoreCollection<any> {
    return this.db.collection('bundle')
  }
  
}
