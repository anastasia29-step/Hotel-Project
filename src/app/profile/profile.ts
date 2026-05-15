import { Component, ElementRef, signal, ViewChild, OnInit } from '@angular/core';
import { Apis } from '../apis';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MyInfo } from './../my-info';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor(public service: Apis,
    public router: Router,
    public actR: ActivatedRoute,
    public cookie: CookieService
  ) { this.loadUserData() }

  userInfo = signal<MyInfo | undefined>(undefined);

  @ViewChild("passMessage") passMessage!: ElementRef

  formInfo: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    zipcode: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl(''),
  });

  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl(),
  })


  loadUserData() {
    this.service.getMyInfo().subscribe({
      next: (data: MyInfo) => {
        console.log(data);

        this.userInfo.set(data);
        this.formInfo.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          address: data.address,
          phone: data.phone,
          zipcode: data.zipcode,
          avatar: data.avatar,
          gender: data.gender,
        });
      },
      error: (errData: any) => {
        console.log(errData);
      },
    });
  }

  changePassword() {
    this.service.changePassword(this.passwordForm.value).subscribe({
      next: (data: any) => {
        this.passMessage.nativeElement.innerText = "Password Changed"
        this.passMessage.nativeElement.style.color = "green"
      },
      error: (cudi: any) => {
        console.log();
        this.passMessage.nativeElement.innerText = cudi.error.error
        this.passMessage.nativeElement.style.color = "red"
      }
    })
  }

  updateUser() {

    this.service.updateProfile(this.formInfo.value).subscribe({
      next: (data: any) => {
        console.log(data);

      },
      error: (cudi: any) => {

      }
    })
  }

  logOut() {
    this.cookie.delete('user');
    this.router.navigate(['/']);
  }
}
