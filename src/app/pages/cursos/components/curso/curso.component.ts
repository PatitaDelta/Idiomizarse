import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit{


  @Input() curso!:Curso
  @Input("user") userType!:string;

  editMode!:boolean;
  
  constructor() { }
  
  ngOnInit(): void {
    this.editMode = this.curso.id == '';
  }

  onCloseEditer(){
    this.editMode = false;
  }

}
