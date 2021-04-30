import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit{


  @Input() curso!:Curso
  @Input("user") userType!:string;

  editMode:boolean = false;
  
  constructor() { }
  
  ngOnInit(): void {
    this.editMode = this.curso.id == '' ||  this.curso.name == '';
  }

  onCloseEditer(curso:Curso){
    this.editMode = false;
    this.curso = curso;
  }

}
