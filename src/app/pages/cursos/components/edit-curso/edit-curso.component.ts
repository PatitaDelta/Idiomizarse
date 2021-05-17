import { CursosService } from '../../cursos.service';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
})
export class EditCursoComponent implements OnInit {

  @Input() curso!:Curso;
  @Output("close") editModeEmiter = new EventEmitter<Curso>();
  cursoForm!:FormGroup;

  constructor(private cursosSer:CursosService) { }

  ngOnInit(): void {
    this.cursoForm = new FormGroup({
      "name" : new FormControl(this.curso.name, [Validators.required]),
      "description" : new FormControl(this.curso.description || ""),
      "image" : new FormControl(this.curso.image || "../../assets/defaultIMG.svg"),
      "time": new FormGroup({
        "hours" : new FormControl(this.curso.hours || 0),
        "minutes" : new FormControl(this.curso.minutes || 0),
      })
    })
  }

  closeEditer(){
    if(!this.curso.id)
      this.cursosSer.deleteNullCurso(this.curso)

    this.editModeEmiter.emit(this.curso);
  }

  onSubmit(){

    this.curso = new Curso(
      this.curso.id,
      this.cursoForm.value.name,
      this.curso.idioma,
      this.curso.actividades,
      this.cursoForm.value.description,
      this.cursoForm.get("time.hours")!.value,
      this.cursoForm.get("time.minutes")!.value,
      this.cursoForm.value.image,
    );

    if(!this.curso.id)
      this.cursosSer.addCurso(this.curso);
    else
      this.cursosSer.editCurso(this.curso);
    
    this.editModeEmiter.emit(this.curso);
  }

  deleteCurso(){
    if(!this.curso.id)
      this.cursosSer.deleteNullCurso(this.curso)
    else
      this.cursosSer.deleteCurso(this.curso);
  }

}
