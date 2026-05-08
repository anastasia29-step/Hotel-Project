import { Component, signal } from '@angular/core';
import { Apis } from '../apis';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-rooms',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms {
  constructor(public actR: ActivatedRoute, public service: Apis) { }

  hotelInfo = signal<any>({})
  hotelRooms = signal<any>([])

  showRooms() {
    this.actR.params.subscribe()
}
}
