import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userSer: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (!this.userSer.isLogged) {
      this.router.navigate(["/inicio"]);
      return false;
    } 
    else if (state.url.includes("/perfil/") && state.url.split("/")[2] !== this.userSer.user.id) {
      this.router.navigate(["/error"]);
      return false;
    }
    else if (this.userSer.userType == "alumno" && (state.url.includes("/actividades/crear") || state.url.includes("/actividades/editar"))) {
      this.router.navigate(["/error"]);
      return false;
    }
    else if(state.url.includes("/aprender")){
      let posIdCurso = state.url.indexOf("#");
      
      if(!this.userSer.user.cursos.includes(state.url.substring(posIdCurso+1))){
        this.router.navigate(["/error"]);
        return false;
      }
    }

    return true;

  }

}
