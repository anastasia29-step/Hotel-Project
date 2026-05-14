import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let router = inject(Router);
  let token = localStorage.getItem('token');
  if(!token){
    router.navigate(['/signIn']);
    return false
  }
  return true
};
