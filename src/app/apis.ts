import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotels } from './sastumroInfo';
import { BehaviorSubject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MyInfo } from './my-info';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Apis {
  constructor(public http: HttpClient, public cookie: CookieService) { }

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
    let token = this.cookie.get("user")?.trim();
    return this.http.get<MyInfo>("https://api.everrest.educata.dev/auth", { headers: { Authorization: `Bearer ${token}` } })
  }
  updateProfile(data: any) {
    let token = this.cookie.get("user")?.trim();
    return this.http.patch("https://api.everrest.educata.dev/auth/update", data, { headers: { Authorization: `Bearer ${token}` } })
  }
  changePassword(info: any) {
    let token = this.cookie.get("user")?.trim();
    console.log("CHANGE PASSWORD TOKEN:", token);

    return this.http.patch("https://api.everrest.educata.dev/auth/change_password", info, { headers: { Authorization: `Bearer ${token}` } })
  }
  getAllBookings() {
    return this.http.get("https://hotelbooking.stepprojects.ge/api/Booking")
  }
  deleteBooking(id: number) {
    return this.http.delete(`https://hotelbooking.stepprojects.ge/api/Booking/${id}`, { responseType: "text" })
  }
}
