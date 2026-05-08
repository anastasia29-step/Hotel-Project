import { Component, signal, } from '@angular/core';
import { Apis } from '../apis';
import { Hotels as HotelModel } from '../sastumroInfo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotels',
  imports: [RouterLink],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class Hotels {
  constructor(public tools: Apis) {
    this.AllHotels()
  }
  ngAfterViewInit(): void {
    let reveals = document.querySelectorAll('.reveal');
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });
    reveals.forEach(item => observer.observe(item));
  }
  hotels = signal<HotelModel[]>([])

  AllHotels() {
    this.tools.getAllHotels().subscribe({
      next: (data: HotelModel[]) => {
        console.log(data);
        this.hotels.set(data)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
