import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotels } from './sastumro';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Apis {
  constructor(public http: HttpClient) { }

  loaderTruck: BehaviorSubject<boolean> = new BehaviorSubject(false)
  getAllHotels() {
    return this.http.get<Hotels[]>("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll")
  }
  getHotelid(id: string){
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${id}`)
  }
}
