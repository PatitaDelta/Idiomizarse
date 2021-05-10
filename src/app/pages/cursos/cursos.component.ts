import { CursosService } from './cursos.service';
import { Component, OnDestroy } from '@angular/core';

import { Curso } from 'src/app/models/curso';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnDestroy{

  cursos: Curso[] = [];
  cursosFilter: Curso[] = [];
  cursosSubs!: Subscription;

  userType = localStorage.getItem("profesor") ? "profesor" : "alumno";
  
  loading:boolean = true;
  inputSearch = ""

  constructor(private cursosSer:CursosService) { 
    this.getCursos();
  }

  getCursos(){
    this.cursosSubs = this.cursosSer.getCursos$().subscribe(
      list => {
        this.cursos = list; 
        this.cursosFilter = list; 
        this.inputSearch = ""
        this.loading = false
      }
    );
  }

  onSearch(terms:string){
    this.cursos = this.cursosFilter.filter(curso => curso.name.includes(terms) );
  }
  
  ngOnDestroy(): void {
    this.cursosSubs.unsubscribe()
  }

  
}
