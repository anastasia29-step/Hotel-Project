import { Component, signal } from '@angular/core';
import { Apis } from '../apis';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms {
  constructor(public actR: ActivatedRoute, public service: Apis) {
    this.showRooms()
  }

  hotelInfo = signal<any>({})
  hotelRooms = signal<any>([])

  showRooms() {
    this.actR.params.subscribe((data: Params) => {
      this.service.getHotelid(data['id']).subscribe((roomsData: any) => {
        console.log(roomsData);
        this.hotelInfo.set(roomsData)
        this.hotelRooms.set(roomsData.rooms)
      })
    })
  }
}
