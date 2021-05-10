import { Component, OnDestroy } from '@angular/core';
import { CursosService } from '../../cursos.service';


import { Curso } from 'src/app/models/curso';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styles: [
  ]
})
export class MisCursosComponent implements OnDestroy {

  public myCursos: Curso[] = [];
  public myCursosFilter: Curso[] = [];
  private myCursosSubs!: Subscription;

  public loading:boolean = true

  userType = localStorage.getItem("profesor") ? "profesor" : "alumno";

  inputSearch = ""

  constructor(private cursosSer:CursosService) { 
    this.getCursos();
  }
  
  getCursos(){
    this.myCursosSubs = this.cursosSer.getCursosOf$().subscribe(list => {
      this.myCursos = list; 
      this.myCursosFilter = list; 

      this.inputSearch = ""
      this.loading = false
    });
  }

  onAddCurso(){
    this.cursosSer.addToEdit(new Curso("","",0,""))
  }

  onSearch(terms:string){
    this.myCursos = this.myCursosFilter.filter(curso => curso.name.includes(terms));
  }
  
  ngOnDestroy(): void {
    this.myCursosSubs.unsubscribe();
  }
}
