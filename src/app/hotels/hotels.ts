import { Component } from '@angular/core';
import { Apis } from '../apis';

@Component({
  selector: 'app-hotels',
  imports: [],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class Hotels {
  constructor (public tools: Apis){}

  AllHotels(){
    this.tools.getAllHotels().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
