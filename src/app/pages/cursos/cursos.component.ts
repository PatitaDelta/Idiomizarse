import { Component, OnInit } from '@angular/core';

import { Curso } from 'src/app/models/curso';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos:Curso[] = [];

  userType = localStorage.getItem("profesor") ? "profesor" : "alumno";

  constructor(private httpSer:HttpService) {
  }

  ngOnInit(): void {
    this.httpSer.getAll("cursos").subscribe(cursosList => {
      this.cursos = cursosList;
      console.log(cursosList);
    })

  }

  openAddCurso(){
    this.cursos.push(new Curso("","",0,""))
  }

}
