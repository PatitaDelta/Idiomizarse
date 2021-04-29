import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Profesor } from '../models/profesor';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  isLogged = localStorage.getItem("profesor") || localStorage.getItem("alumno") ? true : false;
  userSubject: Subject<Alumno | Profesor> = new Subject<Alumno | Profesor>()
  user: Alumno | Profesor = JSON.parse(localStorage.getItem("alumno") || localStorage.getItem("profesor")!)

  constructor(private httpSer: HttpService) { }

  ngOnInit(): void { }

  logIn(user: Alumno | Profesor, type: string) {
    user = this.foundAndPickUser(user, type)
    this.userSubject.next(user);
  }

  //Seguramente esta funcion cambien en el futuro
  register(user: Alumno | Profesor, type: string) {
    this.httpSer.post("alumnos", user);
    user = this.foundAndPickUser(user, type)
    this.userSubject.next(user);
  }


  foundAndPickUser(user: Alumno | Profesor, type: string): Alumno | Profesor {
    switch (type) {
      case "alumno":
        if (this.httpSer.getByEmail("alumnos", user.email)) { }
        localStorage.setItem("alumno", JSON.stringify(user));
        return user;

      case "profesor":
        if (this.httpSer.getByEmail("profesores", user.email)) { }
        localStorage.setItem("profesor", JSON.stringify(user));
        return user;
    }

    return new Alumno("", "", new Date());
  }
  
  logOut() {
    localStorage.clear()
  }
}
