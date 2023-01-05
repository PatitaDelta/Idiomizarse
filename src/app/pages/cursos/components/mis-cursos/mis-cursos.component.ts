import { Component, OnDestroy } from '@angular/core';
import { CursosService } from '../../cursos.service';


import { Curso } from 'src/app/models/curso';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

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

  constructor(private cursosSer:CursosService, private route:ActivatedRoute) { 
    this.getCursos();
  }
  
  getCursos(){
    this.myCursosSubs = this.cursosSer.getCursosOf$().subscribe(list => {
      this.myCursos = list; 
      this.myCursosFilter = list; 

      this.loading = false

      this.route.params.pipe(delay(250)).subscribe(params => {        
        if(params.name != undefined){
          this.inputSearch = params.name;
          this.onSearch(params.name);
        }
      })

    });
  }

  onAddCurso(){
    this.cursosSer.addToEdit(new Curso("","",""))
  }

  onSearch(terms:string){
    this.inputSearch = terms;
    this.myCursos = this.myCursosFilter.filter(curso => curso.name.toLowerCase().includes(terms.toLowerCase()) || curso.idioma.includes(terms.toLowerCase()));
  }
  
  ngOnDestroy(): void {
    this.myCursosSubs.unsubscribe();
  }
}
