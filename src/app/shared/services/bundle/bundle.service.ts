import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BundleService {
  bundleArr = []

  constructor(
    private db: AngularFirestore,
  ) { }

  //getBundle(): void{
  //  this.db.collection('bundl').ref.where('price', '==', '15').onSnapshot(snap => {
  //    snap.forEach(b => {
  //      console.log(b);
  //    })
  //  })
  //}

  //addBundle(bun: object): void {
  //  this.db.collection('bundle').add(bun)
  //    .then(() => console.log('success'))
  //    .catch(err => console.log(err));
  //}
}
