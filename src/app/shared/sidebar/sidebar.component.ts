import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menu = [
    {name:"Actividades", url:".", icon:"bi bi-file-earmark", users:["profesor","alumno"] },
    {name:"Descargar", url:"./descargar", icon:"bi bi-cloud-arrow-down", users:["profesor","alumno"] },
    {name:"Crear", url:"./crear", icon:"bi bi-file-earmark-plus", users:["profesor"] },
    {name:"Editar", url:"./editar", icon:"bi bi-pencil-square", users:["profesor"] },
  ]
  
  public userType:string = "";

  constructor(private userSer:UserService) {this.userType = this.userSer.userType }

  ngOnInit(): void {
  }

}
