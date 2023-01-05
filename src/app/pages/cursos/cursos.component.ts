import { ActivatedRoute } from '@angular/router';
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

  constructor(private cursosSer:CursosService, private route:ActivatedRoute) { 
    this.getCursos();
  }

  getCursos(){
    this.cursosSubs = this.cursosSer.getCursos$().subscribe(
      list => {
        this.cursos = list; 
        this.cursosFilter = list; 

        this.loading = false

        this.route.params.subscribe(params => {
          if(params != undefined){
            this.inputSearch = params.name
            this.onSearch(params.name)
          }
        })
      }
    );
  }

  onSearch(terms:string){
    if(terms != undefined)
      this.cursos = this.cursosFilter.filter(curso => curso.name.toLowerCase().includes(terms.toLowerCase()) || curso.idioma.includes(terms.toLowerCase()) );
  }
  
  ngOnDestroy(): void {
    this.cursosSubs.unsubscribe()
  }

  
}
