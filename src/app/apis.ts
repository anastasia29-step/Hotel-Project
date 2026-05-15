import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotels } from './sastumroInfo';
import { BehaviorSubject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MyInfo } from './my-info';

@Injectable({
  providedIn: 'root',
})
export class Apis {
  constructor(public http: HttpClient) { }

  loaderTruck: BehaviorSubject<boolean> = new BehaviorSubject(false)

  getAllHotels() {
    return this.http.get<Hotels[]>("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll")
  }
  getHotelid(id: number) {
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${id}`)
  }
  filter(info: any) {
    return this.http.post("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered", info)
  }
  roomDetails(id: any) {
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${id}`)
  }
  bookRoom(info: any) {
    return this.http.post("https://hotelbooking.stepprojects.ge/api/Booking", info, { responseType: "text" })
  }
  signUp(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", info, { responseType: "json" })
  }
  signIn(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", info, { responseType: "json" })
  }
  getMyInfo() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<MyInfo>("https://api.everrest.educata.dev/auth", { headers })
  }
  updateProfile(data: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.patch("https://api.everrest.educata.dev/auth/update", data, { headers })
  }
  changePassword(data: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.patch("https://api.everrest.educata.dev/auth/change_password", data, { headers })
  }
  getAllBookings() {
    return this.http.get("https://hotelbooking.stepprojects.ge/api/Booking")
  }
  deleteBooking(id: number) {
    return this.http.delete(`https://hotelbooking.stepprojects.ge/api/Booking/${id}`, { responseType: "text" })
  }
}
