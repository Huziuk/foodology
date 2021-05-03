import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  selectForm = true;
  passwordMatch = false;
  signUpError = false;
  signInError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initSingInForm();
    this.initSingUpForm();
    this.checkUser();
  }

  signIn(): void {
    const { signInEmail, signInPassword } = this.signInForm.value
    this.authService.signIn(signInEmail, signInPassword)
    console.log(this.signInError);
  }

  signUp(): void {
    const { signUpEmail, signUpPassword, signUpRepeatPassword } = this.signUpForm.value
    if (signUpPassword === signUpRepeatPassword) {
      this.passwordMatch = false;
      this.authService.signUp(signUpEmail, signUpPassword)
      console.log(this.signUpError);
      this.signUpForm.reset()
        //this.signUpError = false
        this.selectForm = !this.selectForm;
      //if (this.signUpError){
      //}
    } else {
      this.passwordMatch = true;
    }
  }

  checkUser(): boolean {
    this.authService.loginStatus$.subscribe(data => {
      console.log(data);
      if (data.message == 'The email address is already in use by another account.'){
        //this.signUpError = true
      } else if (data.message == 'The password is invalid or the user does not have a password.'){
        this.signInError = true
      } else {
        this.signUpError = false
        this.signInError = false
      }
    })
    return false
  }

  changeForm(): void {
    this.selectForm = !this.selectForm;
    this.passwordMatch = false
    this.signInForm.reset()
    this.signUpForm.reset()
    this.signUpError = false;
    this.signInError = false;
  }

  validByControl(form: FormGroup, control: string): any {
    if (form.controls[control].untouched) {
      return true
    }
    return form.controls[control].valid;
  }

  initSingInForm(): void {
    this.signInForm = this.fb.group({
      signInEmail: [null, [Validators.required]],
      signInPassword: [null, [Validators.required]],
    })
  }

  initSingUpForm(): void {
    this.signUpForm = this.fb.group({
      signUpEmail: [null, [Validators.required, Validators.email]],
      signUpPassword: [null, [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,32})')]],
      signUpRepeatPassword: [null, [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,32})')]],
    })
  }

}
