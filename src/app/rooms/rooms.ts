import { Component, signal } from '@angular/core';
import { Apis } from '../apis';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Filtration } from "../filtration/filtration";

@Component({
  selector: 'app-rooms',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, Filtration],
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
  filtered(filteredData: any) {
    this.hotelRooms.set(filteredData)
  }
}
