import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad';
import { Alumno } from 'src/app/models/alumno';
import { Profesor } from 'src/app/models/profesor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  public cursos!:Actividad[];

  private user!:Alumno | Profesor;

  constructor(private userSer:UserService) {
  }

  ngOnInit(): void {
    this.userSer.userSubject.subscribe((user)=>{
        this.user = user;
        console.log("guardado")
    })
  }

}
