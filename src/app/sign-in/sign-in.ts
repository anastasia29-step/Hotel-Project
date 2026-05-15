import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Apis } from '../apis';
import { email } from '@angular/forms/signals';
import { ParseSourceFile } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  constructor(public service: Apis,
    public router: Router,
    public actR: ActivatedRoute,
    public cookie: CookieService
  ){}

  message: string = '';
  ngOnInit(){
    this.actR.queryParams.subscribe(params => {
      if(params['authRequired']){
        this.message = 'Please, log in to your account first';
        
      }
    })
  }
  loading: boolean = false;
  errorMessage: string = '';

  formInfo: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  signIn(){
    if(this.formInfo.invalid){
      this.formInfo.markAllAsTouched();
      return
    }

    this.loading = true;
    this.errorMessage = '';
    this.service.signIn(this.formInfo.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        this.cookie.set("user", data.access_token) 
        this.router.navigate(['/']) 
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
        this.errorMessage = 'Email or password is incorrect'
        
      }
    })
  }
}
