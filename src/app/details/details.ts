import { Component, signal } from '@angular/core';
import { Apis } from '../apis';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  constructor(public service: Apis, public actR: ActivatedRoute) { 
    this.showRoomInfo()
  }

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

  formInfo: FormGroup = new FormGroup ({
    checkInDate: new FormControl ('', Validators.required),
    checkOutDate: new FormControl ('', Validators.required),
    customerName: new FormControl ('', Validators.required),
    customerPhone: new FormControl ('', Validators.required),
  })

  bookRoom(){
    this.formInfo.value.roomID = this.roomId
    if(this.formInfo.value.checkInDate < this.formInfo.value.checkOutDate){
      this.service.bookRoom(this.formInfo.value).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    } else {
      alert("Please, choose available dates")
    }
  }
}
