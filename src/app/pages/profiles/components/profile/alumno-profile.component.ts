import { Component, OnDestroy, OnInit } from '@angular/core';
import { CursosService } from './../../../cursos/cursos.service';
import { UploadFilesService } from './../../../../services/upload-files.service';
import { Alumno } from 'src/app/models/alumno';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import Swal from 'sweetalert2';
import { Profesor } from 'src/app/models/profesor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-profile',
  templateUrl: './alumno-profile.component.html',
  styleUrls: ['./alumno-profile.component.css']
})
export class AlumnoProfileComponent implements OnInit, OnDestroy {
  
  public editForm!:FormGroup;
  public cursos:Curso[] = [];
  private cursosSubs!:Subscription;

  public usuario!:Alumno | Profesor
  public userType!:string;
  public editMode:boolean = true;

  public loadingCursos:boolean = true;

  public loadingImg:boolean = false;
  public imgToUpload!:File;
  public imgTemp!:any;
  

  constructor(private userSer:UserService, private upFireSer:UploadFilesService,private cursosSer:CursosService, private router:Router) { }

  ngOnInit(): void {
    this.cursosSubs = this.cursosSer.getCursosOf$().subscribe((cursos)=>{
      this.cursos = cursos
      this.loadingCursos = false
    });

    //@ts-ignore
    this.usuario = this.userSer.user;
    this.userType = this.userSer.userType

    this.editForm = new FormGroup({
      "dni": new FormControl(this.usuario.dni, [Validators.minLength(8),Validators.pattern(/^[0-9]{8,8}[A-Za-z]$/),Validators.required]),
      "name": new FormControl(this.usuario.name, [Validators.minLength(4),Validators.required]),
      "email": new FormControl(this.usuario.email,[Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),Validators.required]),
      "phone": new FormControl(this.usuario.phone, [Validators.minLength(9),Validators.maxLength(9), Validators.pattern(/[0-9]{9}/),Validators.required]),
      "location": new FormControl(this.usuario.location),
      "foto": new FormControl(null),
    });
  }

  onSubmit(){
    this.tongleEditMode();

    if(this.imgToUpload)
      this.uploadImg(this.imgToUpload);
    

    this.usuario.dni = this.editForm.value.dni;
    this.usuario.name = this.editForm.value.name;
    this.usuario.email = this.editForm.value.email;
    this.usuario.phone = this.editForm.value.phone;
    this.usuario.location = this.editForm.value.location;

    this.userSer.updateUser(this.usuario);
  }

  tongleEditMode(){
    this.imgTemp = null;
    this.editForm.get("foto")?.setValue("");

    this.editMode = !this.editMode;
  }

  changeImg(event:any){
    this.loadingImg = true;
    this.imgToUpload = event.files[0];

    if(!this.imgToUpload){ this.loadingImg = false; return} 

    let reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onloadend = ()=>{
      this.imgTemp = reader.result;
      this.loadingImg = false;
    }
  }

  uploadImg(img:File){
    this.loadingImg = true;
    this.upFireSer.uploadImg(img,"users", this.usuario.id!).then((resp:any) =>{
      this.upFireSer.downloadImg("users",this.usuario.id!).then(url=>{ 
        this.usuario.foto = url
        this.loadingImg = false;
      })
    })
  }

  editSub(curso:Curso){
    this.router.navigate([`/cursos/miscursos/${curso.name}`])
  }

  deleteSub(curso:Curso){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No vas a poder revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursosSer.deleteCursoOfUser(curso);
        Swal.fire(
          'Borrado!',
          'Tu subscripción ha sido eliminada',
          'success'
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.cursosSubs.unsubscribe();
  }
}
