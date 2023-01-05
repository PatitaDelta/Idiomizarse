import { CursosService } from './../../cursos.service';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit{


  @Input() curso!:Curso
  @Input("user") userType!:string;
  @Input() inMyList:boolean = false;

  canAdd:boolean = true;
  canEdit:boolean = false;
  editMode:boolean = false;
  
  constructor(private userSer:UserService,private cursosSer:CursosService) { }
  
  ngOnInit(): void {
    this.editMode = this.curso.id == '' ||  this.curso.name == '';
    if(this.userSer.user.cursos){
      this.canAdd = !this.userSer.user.cursos.includes(this.curso.id)
      this.canEdit = this.userSer.user.cursos.includes(this.curso.id)
    }
  }

  onAddToUserCursos(){
    this.cursosSer.addCursoToUser(this.curso);
    this.canAdd = false;
  }

  onDeleteToUserCursos(){
    this.cursosSer.deleteCursoOfUser(this.curso);
    this.canAdd = true;
  }

  onCloseEditer(curso:Curso){
    this.editMode = false;
    this.curso = curso;
  }

}
