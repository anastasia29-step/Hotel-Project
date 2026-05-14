import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { Apis } from '../apis';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booked-rooms',
  imports: [CommonModule],
  templateUrl: './booked-rooms.html',
  styleUrl: './booked-rooms.css',
})
export class BookedRooms {

  constructor(public service: Apis) {
    this.allBookings()
  }
  @ViewChild('removeSMS') removeSMS!: ElementRef;
  bookedRooms = signal<any[]>([])

  allBookings() {
    this.service.getAllBookings().subscribe({
      next: (data: any) => {
        let filteredDates = data.filter((item: any) => item.checkOutDate > item.checkInDate).reverse()
        this.bookedRooms.set(filteredDates)

      },
      error: (cudi: any) => {
        console.log(cudi);

      }
    })
  }

  removeBooking(id: number) {
    this.service.deleteBooking(id).subscribe({
      next: (goodAnswer: any) => {
        console.log(goodAnswer);
        this.removeSMS.nativeElement.innerText = goodAnswer;
        this.removeSMS.nativeElement.style.color = 'white';
        this.removeSMS.nativeElement.classList.add('removeSMSshow')
        setTimeout(() => {
          this.removeSMS.nativeElement.classList.remove('removeSMSshow')
        }, 4000)
        this.allBookings()
      },
      error: (badAnswer: any) => {
        console.log(badAnswer.error);
        this.removeSMS.nativeElement.innerText = badAnswer.error;
        this.removeSMS.nativeElement.style.color = 'white';
        this.removeSMS.nativeElement.classList.add('removeSMSshow')
        setTimeout(() => {
          this.removeSMS.nativeElement.classList.remove('removeSMSshow')
        }, 4000)

      }
    })
  }
}
