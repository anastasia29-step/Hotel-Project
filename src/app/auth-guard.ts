import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let router = inject(Router);
  let token = localStorage.getItem('token');
  if(token){
    return true;
  } 
  return router.createUrlTree(
    ['/signIn'],
    {
      queryParams: {
        authRequired: true
      }
    }
  )
};
