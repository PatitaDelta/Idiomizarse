import { OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
import { Component, OnDestroy } from '@angular/core';

import { Curso } from 'src/app/models/curso';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnDestroy, OnInit{

  cursos: Curso[] = [];
  cursosSubs!: Subscription;

  userType = localStorage.getItem("profesor") ? "profesor" : "alumno";

  constructor(private cursosSer:CursosService) { 
    
    this.cursosSubs = this.cursosSer.getCursos$().subscribe(
      list => this.cursos = list
    );    
  }
  
  ngOnInit(): void {
  }
  
  onAddCurso(){
    this.cursos.push(new Curso("","",0,""))
  }

  onSearch(terms:string){
    this.cursos = this.cursos.filter(curso => curso.name === terms);
  }
  
  ngOnDestroy(): void {
    this.cursosSubs.unsubscribe()
  }

  
}
