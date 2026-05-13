import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotels } from './sastumroInfo';
import { BehaviorSubject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root',
})
export class Apis {
  constructor(public http: HttpClient) { }

  loaderTruck: BehaviorSubject<boolean> = new BehaviorSubject(false)
  
  getAllHotels() {
    return this.http.get<Hotels[]>("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll")
  }
  getHotelid(id: number){
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${id}`)
  }
  filter(info: any){
    return this.http.post("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered", info)
  }
  roomDetails(id: any){
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${id}`)
  }
  bookRoom(info: any){
    return this.http.post("https://hotelbooking.stepprojects.ge/api/Booking", info, {responseType: "text"})
  }
}
