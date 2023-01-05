import { HttpService } from 'src/app/services/http.service';
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
  userType!:string;


  constructor(public userSer:UserService, private router:Router) { }
  
  ngOnInit(): void {
    this.user = this.userSer.user;
    this.userType = this.userSer.userType;      

    this.userSer.userSubject.subscribe((usr)=>{
        console.log(usr);
        
        this.userSer.isLogged = true;
        this.user = usr;
        this.userType = this.userSer.userType;
        localStorage.setItem(this.userSer.userType, JSON.stringify({...usr, password: ""}));
      });
  }

  onLogout(){
    this.userSer.isLogged = false, this.openForm = false;
    this.userSer.logOut();
    
    this.router.navigate(["/"]).then(()=>window.location.reload());
  }

}
