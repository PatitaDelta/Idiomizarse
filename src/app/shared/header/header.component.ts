import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Profesor } from 'src/app/models/profesor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  toLogin!:boolean;
  openForm:boolean = false;
  user!:Alumno | Profesor;

  constructor(public userSer:UserService, private router:Router) {this.user = userSer.user }

  ngOnInit(): void {
    this.userSer.userSubject.subscribe((usr)=>{
        this.userSer.isLogged = true;
        this.user = usr
        localStorage.setItem(this.userSer.userType, JSON.stringify({...usr, password: ""}));
      });
  }

  onLogout(){
    this.userSer.isLogged = false, this.openForm = false;
    this.userSer.logOut();
    this.router.navigate(["/inicio"]);
  }

}
