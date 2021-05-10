import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private userSer:UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    if(!this.userSer.isLogged){
      this.router.navigate(["/inicio"]);
      return false;
    }

    return true;

  }
  
}
