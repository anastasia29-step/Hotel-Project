import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
   let cookie = inject(CookieService);
   let router = inject(Router);
   

   if(cookie.get("user")){
    return true
   } 
    router.navigate(['/signIn'], {
      queryParams: {authRequired: true}
    });
    return false
   
};
