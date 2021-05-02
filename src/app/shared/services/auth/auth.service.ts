import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStatus$ = new Subject<any>()

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  signIn(email: string, passsword: string): void {
    this.auth.signInWithEmailAndPassword(email, passsword)
      .then(userCredential => {
        this.db.collection('users').ref.where('uid', '==', userCredential.user.uid).onSnapshot(snap => {
          snap.forEach(user => {
            const myUser = {
              id: user.id,
              ...user.data() as any
            };
            localStorage.setItem('user', JSON.stringify(myUser));
            this.loginStatus$.next('user')
            this.router.navigateByUrl('profile');
          })
        }
        )
      })
      .catch(err => {
        this.loginStatus$.next(err)
      })
  }

  signUp(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = {
          uid: userCredential.user.uid,
          firstName: '',
          lastName: '',
          phone: '',
          cardNumber: '',
          cardDate: '',
          email: userCredential.user.email,
          password: password,
          date: new Date(),
          role: 'ADMIN',
        }
        this.db.collection('users').add(user)
          .then(myUser => {})
          .catch(err => console.log(err))
      })
      .catch(err => this.loginStatus$.next(err))
  }

  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user')
        this.loginStatus$.next('logout')
        this.router.navigateByUrl('login')
      });
  }

  updateProfile(user: IUser): void {
    this.db.collection('users').doc(user.id).update(user).then(
      () => { this.toastr.success('Profile save success') },
      err => { this.toastr.error('Profile save error'); console.log(err) }
    )
  }

}
