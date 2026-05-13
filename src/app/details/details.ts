import { Component, signal } from '@angular/core';
import { Apis } from '../apis';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
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
}
