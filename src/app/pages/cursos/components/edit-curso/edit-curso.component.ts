import { CursosService } from '../../cursos.service';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
})
export class EditCursoComponent implements OnInit {

  @Input() curso!:Curso;
  @Output("close") editModeEmiter = new EventEmitter<Curso>();

  cursoForm!:FormGroup;
  idiomas: string[] = ["español","ingles","frances"]

  provisionalFile!:any;
  uploadFile!:File;
  uploadFileURl!:any

  constructor(private cursosSer:CursosService, private upFilesSer:UploadFilesService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {    
    this.cursoForm = new FormGroup({
      "name" : new FormControl(this.curso.name, [Validators.required]),
      "description" : new FormControl(this.curso.description || ""),
      "idioma" : new FormControl(this.curso.idioma, [Validators.required]),
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
    this.uploadImg().then(() =>{

      this.curso = new Curso(
        this.curso.id,
        this.cursoForm.value.name,
        this.curso.idioma,
        this.curso.actividades,
        this.cursoForm.value.description,
        this.cursoForm.get("time.hours")!.value,
        this.cursoForm.get("time.minutes")!.value,
        this.uploadFileURl,
      );

      if(!this.curso.id)
        this.cursosSer.addCurso(this.curso);
      else
        this.cursosSer.editCurso(this.curso);
      
      this.editModeEmiter.emit(this.curso);
    });
  }

  deleteCurso(){
    this.upFilesSer.deleteImg("cursos",this.curso.id);

    if(!this.curso.id)
      this.cursosSer.deleteNullCurso(this.curso)
    else
      this.cursosSer.deleteCurso(this.curso);
  }

  cambiarImg(event:any){
    this.uploadFile = event.files[0];

    if(!event.files[0]){return}

    var reader = new FileReader();
    reader.readAsDataURL(event.files[0]);

    reader.onloadend = () => {
      this.provisionalFile = this.sanitizer.bypassSecurityTrustUrl(`${reader.result}`);
    }
  }

  async uploadImg(){
    await this.upFilesSer.uploadImg(this.uploadFile,"cursos",this.curso.id).then(() =>
      this.upFilesSer.downloadImg("cursos",this.curso.id).then((url) => this.uploadFileURl = url)
    )
  }

}
