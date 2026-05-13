import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Hotels } from './hotels/hotels';
import { Rooms } from './rooms/rooms';
import { Details } from './details/details';
import { BookedRooms } from './booked-rooms/booked-rooms';
import { SignUp } from './sign-up/sign-up';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "hotels", component: Hotels },
    {path: "rooms/:id", component: Rooms},
    {path: "details/:id/:saxeli", component: Details},
    {path: "booked-rooms", component: BookedRooms},
    {path: "signUp", component: SignUp}
];
