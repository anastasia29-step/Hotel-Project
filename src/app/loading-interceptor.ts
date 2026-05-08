import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Apis } from './apis';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let service = inject(Apis);

  service.loaderTruck.next(true);

  return next(req).pipe(
    finalize(() => {
      service.loaderTruck.next(false);
    }),
  );
};
