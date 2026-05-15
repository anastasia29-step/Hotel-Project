import { Component, signal } from '@angular/core';
import { Apis } from '../apis';
import { RouterLink, ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(public actR: ActivatedRoute, public service: Apis, public router: Router) {
    this.showRooms()
  }
  showLoginCard: boolean = false;

  onBookRoomClick(roomId: string, roomName: string) {
    let token = localStorage.getItem('token')
    if (!token) {
      this.showLoginCard = true
    }
    else {
      this.router.navigate(['/details', roomId, roomName])
    }
  }

  closeOverlay() {
    this.showLoginCard = false
  }

  goToSignIn() {
    this.router.navigate(['/signIn'])
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
