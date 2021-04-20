import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {

  @Input() curso!:Curso;
  @Output("close") editModeEmiter = new EventEmitter<Curso>();
  cursoForm!:FormGroup;

  constructor(private httpSer:HttpService) { }

  ngOnInit(): void {
    console.log(this.curso);

    this.cursoForm = new FormGroup({
      "name" : new FormControl(this.curso.name),
      "description" : new FormControl(this.curso.description || ""),
      "image" : new FormControl(this.curso.image || "../../assets/defaultIMG.svg"),
      "time": new FormGroup({
        "hours" : new FormControl(this.curso.hours || 0),
        "minutes" : new FormControl(this.curso.minutes || 0),
      })
    })
  }

  closeEditer(){
    this.editModeEmiter.emit(this.curso);
  }

  onSubmit(){

    this.curso = new Curso(
      this.cursoForm.value.name,
      "",
      0,
      "",
      this.cursoForm.value.description,
      this.cursoForm.get("time.hours")!.value,
      this.cursoForm.get("time.minutes")!.value,
      this.cursoForm.value.image,
    );

    console.log(this.curso);

    this.httpSer.post("cursos",this.curso).subscribe(
      response =>{
        console.log("enviado correctamente ",response);
      },
      responseError=>{
        console.log("ha ocurrido un error ", responseError.error.error);
      });

    this.closeEditer();
  }

  deleteCurso(){
    this.httpSer.deleteById("cursos", this.curso.id);
  }

}
