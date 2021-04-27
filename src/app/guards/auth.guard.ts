import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    // return this.usuarioSer.validarToken().pipe(
    //   tap(autenticado =>{ 
    //     if(!autenticado)
    //       this.router.navigate(["/login"]);
    //   })
    // )
    
    return true;

  }
  
}
