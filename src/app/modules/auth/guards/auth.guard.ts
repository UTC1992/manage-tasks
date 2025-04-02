import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '@app/core/services/token.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenService);

  if (!tokenService.isLoggedIn()) {
    return false;
  }

  return true;
};
