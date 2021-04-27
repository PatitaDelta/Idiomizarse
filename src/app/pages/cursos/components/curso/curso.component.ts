import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {


  @Input() curso!:Curso;
  @Input("user") userType!:string;

  editMode:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCloseEditer(event:Curso){
    this.editMode = false;
    this.curso = event
  }

}
