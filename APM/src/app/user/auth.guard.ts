import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from '@angular/router';
import {AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor ( private authService: AuthService,
    private router: Router ) {}
    
  //for lazy loaded modules
  canLoad(route: Route): boolean  {
    return this.checkLoggedIn(route.path);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn(state.url);
  }


  checkLoggedIn(url :  string) : boolean {
    if(this.authService.isLoggedIn) {
    return true;
  }
  this.authService.redirectlUrl = url;
  this.router.navigateByUrl('/login');
  return false;
}
  
}
