import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menu = [
    {name:"Actividades", url:".", icon:"bi bi-file-earmark" },
    {name:"Descargar", url:"./descargar", icon:"bi bi-cloud-arrow-down" },
    {name:"Crear", url:"./crear", icon:"bi bi-file-earmark-plus", user:"profesor" },
    {name:"Editar", url:"./editar", icon:"bi bi-pencil-square", user:"profesor" },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
