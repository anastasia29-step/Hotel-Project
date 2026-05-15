import { Component } from '@angular/core';
import { Apis } from '../apis';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(public service: Apis, public cookie: CookieService, public router: Router) { }

  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  formInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]
    ),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]
    ),
    age: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  })

  signUp() {
    if (this.formInfo.invalid) {
      this.formInfo.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.service.signUp(this.formInfo.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        this.successMessage = 'Account created successfully';
        if (data?.accessToken) {
          this.cookie.set('token', data.accessToken);
        }
        this.formInfo.reset()
      },
      error: (error: any) => {
        console.log(error.error.errorKeys);
        this.loading = false;
        this.errorMessage =
          error?.error?.message || 'Something went wrong'

      }
    })
  }
}
