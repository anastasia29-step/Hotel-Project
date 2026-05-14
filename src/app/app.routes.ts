import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Hotels } from './hotels/hotels';
import { Rooms } from './rooms/rooms';
import { Details } from './details/details';
import { BookedRooms } from './booked-rooms/booked-rooms';
import { SignUp } from './sign-up/sign-up';
import { SignIn } from './sign-in/sign-in';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "hotels", component: Hotels },
    {path: "rooms/:id", component: Rooms},
    {path: "details/:id/:saxeli", component: Details, canActivate: [authGuard]},
    {path: "booked-rooms", component: BookedRooms},
    {path: "signUp", component: SignUp},
    {path: "signIn", component: SignIn},
];
