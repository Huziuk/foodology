import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUser;
  profileForm: FormGroup;
  adminStatus: boolean;
  saveStatus = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.initForm()
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.user.role == 'ADMIN' ? this.adminStatus = true : this.adminStatus = false;
  }

  saveProfile(): void {
    this.user.firstName = this.profileForm.value.firstName
    this.user.lastName = this.profileForm.value.lastName
    this.user.phone = this.profileForm.value.phone
    this.user.cardNumber = this.profileForm.value.cardNumber
    this.user.cardDate = this.profileForm.value.cardDate
    this.authService.updateProfile(this.user)
    localStorage.setItem('user', JSON.stringify(this.user))
    this.saveStatus = false
  }

  signOut(): void {
    this.authService.signOut()
  }

  validByControl(control: string): any {
    if (this.profileForm.controls[control].untouched) {
      return true
    }
    return this.profileForm.controls[control].valid;
  }

  changeInput(){
    if (
      this.user.firstName != this.profileForm.value.firstName || 
      this.user.lastName != this.profileForm.value.lastName ||
      this.user.phone != this.profileForm.value.phone ||
      this.user.cardNumber != this.profileForm.value.cardNumber ||
      this.user.cardDate != this.profileForm.value.cardDate
    ) {
      this.profileForm.valid ? this.saveStatus = true : this.saveStatus = false
    }
    else this.saveStatus = false
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.pattern('^[A-Z]{1}[a-z]+$')]],
      lastName: [this.user.lastName, [Validators.pattern('^[A-Z]{1}[a-z]+$')]],
      email: [this.user.email, [Validators.required]],
      phone: [this.user.phone, [Validators.pattern('^[0-9]{10}$')]],
      cardNumber: [this.user.cardNumber, [Validators.pattern('^[0-9]{16}$')]],
      cardDate: [this.user.cardDate, [Validators.pattern('^[0-9]{4}$')]],
    })
  }

}
