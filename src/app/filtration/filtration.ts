import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apis } from '../apis';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-filtration',
  imports: [ReactiveFormsModule],
  templateUrl: './filtration.html',
  styleUrl: './filtration.css',
})
export class Filtration implements OnInit {
  constructor(public service: Apis, public actR: ActivatedRoute) { }

  @Output() transit: EventEmitter<any> = new EventEmitter

  formInfo: FormGroup = new FormGroup({
    roomTypeId: new FormControl("", Validators.required),
    PriceFrom: new FormControl("", Validators.required),
    PriceTo: new FormControl("", Validators.required),
    maximumGuests: new FormControl("", Validators.required),
    checkIn: new FormControl("", Validators.required),
    checkOut: new FormControl("", Validators.required),
  })
  allRooms: any[] = []
  filteredRooms: any[] = []

  ngOnInit() {
    this.showRooms()
  }

  showRooms() {
    this.actR.params.subscribe((data: Params) => {
      this.service.getHotelid(data['id']).subscribe((roomsData: any) => {
        console.log(roomsData);
        this.allRooms = roomsData.rooms
        this.filteredRooms = roomsData.rooms
      })
    })
  }
  filterRooms() {
    this.service.filter(this.formInfo.value).subscribe({
      next: (data: any) => {
        this.transit.emit(data)
      },
      error: (err: any) => {
        this.transit.emit(err)
      }
    })
  }
  reset() {
    this.formInfo.reset({
      PriceFrom: '',
      PriceTo: '',
      roomTypeId: '1',
      maximumGuests: '1',
      checkIn: '',
      checkOut: ''
    })
    this.filteredRooms = [...this.allRooms]
    this.transit.emit(this.filteredRooms)
  }
}
