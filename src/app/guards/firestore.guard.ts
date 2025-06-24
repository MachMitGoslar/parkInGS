import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const firestoreGuard: CanActivateFn = (route, state) => {
  
  let userService = inject(UserService);
  let router = inject(Router);


  return userService.authenticated || router.createUrlTree(["/login"])


};

export const firestoreNestedGuard: CanActivateChildFn = (route, state) => {
  
  let userService = inject(UserService);
  let router = inject(Router);


  return userService.authenticated || router.createUrlTree(["/login"])


};
