import { Component, ElementRef, signal, ViewChild, OnInit } from '@angular/core';
import { Apis } from '../apis';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MyInfo } from './../my-info';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor(public service: Apis,
    public router: Router,
    public actR: ActivatedRoute
  ) { }

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

  ngOnInit() {
    this.loadUserData();
  }

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
    if (!this.passwordForm.valid || !this.passwordForm.value.oldPassword || !this.passwordForm.value.newPassword) {
      this.passMessage.nativeElement.innerText = "Please fill in all password fields"
      this.passMessage.nativeElement.style.color = "red"
      return;
    }

    this.service.changePassword(this.passwordForm.value).subscribe({
      next: (data: any) => {
        this.passMessage.nativeElement.innerText = "Password Changed Successfully"
        this.passMessage.nativeElement.style.color = "green"
        this.passwordForm.reset();
        setTimeout(() => {
          this.passMessage.nativeElement.innerText = "";
        }, 3000);
      },
      error: (cudi: any) => {
        console.log(cudi);
        this.passMessage.nativeElement.innerText = cudi.error?.error || "Password change failed"
        this.passMessage.nativeElement.style.color = "red"
        setTimeout(() => {
          this.passMessage.nativeElement.innerText = "";
        }, 3000);
      }
    })
  }
  updateUser() {
    this.service.updateProfile(this.formInfo.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadUserData();
        alert("Profile updated successfully!");
      },
      error: (cudi: any) => {
        console.log(cudi);
        alert("Failed to update profile: " + (cudi.error?.error || "Unknown error"));
      }
    })
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}