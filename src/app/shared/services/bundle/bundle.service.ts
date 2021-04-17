import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IBundle } from '../../interfaces/bundle.interface';

@Injectable({
  providedIn: 'root'
})
export class BundleService {
  bundleArr = []
  url: string;

  constructor(
    private db: AngularFirestore,
    private http: HttpClient
  ) {
    this.url = 'http://localhost:3000/bundles'
  }

  firebaseBundle(): AngularFirestoreCollection<any> {
    return this.db.collection('bundle')
  }
  
}
