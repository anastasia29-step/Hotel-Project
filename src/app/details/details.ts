import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Apis } from '../apis';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  constructor() {
    this.showRoomInfo()
  }
  public service = inject(Apis);
  public actR = inject(ActivatedRoute);
  public router = inject(Router)
  @ViewChild('bookSMS') bookSMS!: ElementRef;
  roomInfo = signal<any>({})
  roomId: any;


  showRoomInfo() {
    this.actR.params.subscribe((data: any) => {
      console.log(data.id);
      this.roomId = data.id;
      this.service.roomDetails(data.id).subscribe((roomsData: any) => {
        console.log(roomsData);
        this.roomInfo.set(roomsData);
      });
    });
  }

  formInfo: FormGroup = new FormGroup({
    checkInDate: new FormControl('', Validators.required),
    checkOutDate: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    customerPhone: new FormControl('', Validators.required),
  })

  bookRoom() {
    if (this.router) {
      this.formInfo.value.roomID = this.roomId
      if (this.formInfo.value.checkInDate < this.formInfo.value.checkOutDate) {
        this.service.bookRoom(this.formInfo.value).subscribe({
          next: (data: any) => {
            console.log(data);
            this.bookSMS.nativeElement.innerText = data;
            this.bookSMS.nativeElement.style.backgroundColor = 'darkgreen';
            this.bookSMS.nativeElement.style.color = 'white'
            this.bookSMS.nativeElement.classList.add('bookSMSshow');
            setTimeout(() => {
              this.bookSMS.nativeElement.classList.remove('bookSMSshow')
            }, 4000)
          },
          error: (error: any) => {
            console.log(error);
            this.bookSMS.nativeElement.innerText = error.error;
            this.bookSMS.nativeElement.style.backgroundColor = 'darkred';
            this.bookSMS.nativeElement.style.color = 'white';
            this.bookSMS.nativeElement.classList.add('bookSMSshow');
            setTimeout(() => {
              this.bookSMS.nativeElement.classList.remove('bookSMSshow')
            }, 4000)
          }
        })
      } else {
        alert("Please, choose available dates")
      }
    } else {
      alert ('Please log in to your account first')
    }

  }
}
