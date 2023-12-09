import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.userData$.pipe(
    switchMap((user) => {
      if (user) {
        return of(user.isActive);
      } else {
        return of(false);
      }
    }),
    map((verified) => {
      if (verified) {
        return true;
      } else {
        console.log('Not authorized');
        return router.createUrlTree(['/sign-in'], {
          queryParams: { returnUrl: state.url },
        });
      }
    })
  );
};
