import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apis } from '../apis';

@Component({
  selector: 'app-filtration',
  imports: [ReactiveFormsModule],
  templateUrl: './filtration.html',
  styleUrl: './filtration.css',
})
export class Filtration {
  constructor (public service: Apis) {}

@Output() transit: EventEmitter<any> = new EventEmitter 

  formInfo: FormGroup = new FormGroup({
    roomTypeId: new FormControl("", Validators.required),
    PriceFrom: new FormControl("", Validators.required),
    PriceTo: new FormControl("", Validators.required),
    maximumGuests: new FormControl("", Validators.required),
    checkIn: new FormControl("", Validators.required),
    checkOut: new FormControl("", Validators.required),
  })
  filterRooms(){
    this.service.filter(this.formInfo.value).subscribe({
      next: (data: any) => {
        this.transit.emit(data)
      },
      error: (err: any) => {
        this.transit.emit(err)
      }
    })
  }
}
