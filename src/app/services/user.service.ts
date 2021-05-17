import { AngularFireAuth } from '@angular/fire/auth'

import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Profesor } from '../models/profesor';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  public user: Alumno | Profesor = JSON.parse(localStorage.getItem("alumno") || localStorage.getItem("profesor")!)
  public userType:string = localStorage.getItem("alumno") ? "alumno" : "" || localStorage.getItem("profesor") ? "profesor" : ""
    
  public userSubject = new Subject<Alumno | Profesor>();
  
  public isLogged = localStorage.getItem("profesor") || localStorage.getItem("alumno") ? true : false;

  constructor(private afAuth:AngularFireAuth, private http:HttpService) { }

  ngOnInit(): void { }

  logIn(user: Alumno | Profesor, type: "profesor"|"alumno") {
    
    let usrList:Alumno[] | Profesor[] = []
    this.userType = type;

    //Coje la lista del tipo del usr
    if(type == "alumno") 
      this.http.getAll("alumnos").subscribe(list => usrList = list)
    else if (type == "profesor")
      this.http.getAll("profesores").subscribe(list => usrList = list)


    //Compureba que existe el usr y luego lo busca en su respectiba tabla
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((resp:any) => {      
      for(let usr of usrList){
        if(usr.uid === resp.user.uid){
          this.user = usr;
          localStorage.setItem(type, JSON.stringify({...usr, password: ""}));
          this.userSubject.next(usr);
          break;
        }
      }

      if(!localStorage.getItem(type))
        throw Error("No existe usuario con ese tipo de cuenta")

    });
  }

  register(user: Alumno | Profesor, type: "profesor"|"alumno") {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((resp:any) => {
      user.uid = resp.user.uid
    
      if(type == "alumno")
        this.http.post("alumnos", user).subscribe()
      else if (type == "profesor")
        this.http.post("profesores", user).subscribe()
    })
  }
  
  updateUser(user: Alumno | Profesor){
    if(this.userType == "profesor")
      this.http.putById("profesores",user,user.id!).subscribe(() => this.userSubject.next(this.user))
    else if(this.userType == "alumno")
      this.http.putById("alumnos",user,user.id!).subscribe(() => this.userSubject.next(this.user))
  }

  logOut() {
    this.afAuth.signOut()
    localStorage.clear()
  }
}
