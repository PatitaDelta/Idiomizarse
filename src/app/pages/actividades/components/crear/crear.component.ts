import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Pregunta } from './../../../../models/interfaces/pregunta';
import { Curso } from './../../../../models/curso';
import { Actividad } from 'src/app/models/actividad';

import { ActividadesService } from './../../actividades.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: []
})
export class CrearActividadesComponent implements OnInit {

  public typeActiviti:string = ""
  public loading:boolean = false;
  public editMode:boolean = false;
  
  //Edit
  public actividadEdit!:Actividad;

  //Create
  public cursos:Curso[] = [];

  public preguntas:Pregunta[] = []
  public enunciado:string = "";
  public respuestas:{respuesta:string, correcta:boolean}[] =[];

  private fileUpload!:File;

  public toPreViewImg!:any
  public preViewImg!:any
  public preViewVideo!:any

  public typesList:string[] = ["describir","video","otros"];
  public createForm = new FormGroup({
  // Cabecera
    "titulo":new FormControl(null,[Validators.required]),
    "tipo":new FormControl(null,[Validators.required]),
    "curso": new FormControl(null,[Validators.required]),
  
  // Media 
    "media": new FormControl(null,[Validators.required]),

  // Preguntas
    "enunciado": new FormControl(null),
    "respuestas":new FormGroup({
      "respuesta":new FormControl(null),
      "correcta":new FormControl(null),
    },[Validators.required]),
  });

  
  constructor(
    private upFileSer:UploadFilesService, 
    private actividadesSer:ActividadesService, 
    private sanitizer:DomSanitizer, 
    private route:ActivatedRoute, 
    private router:Router) { }

  ngOnInit(): void {

    if(this.route.snapshot.url[0].path === "editar"){
      this.loading = true;
      this.editMode = true;
      this.editActividad()
    }

    this.actividadesSer.getCursosOf$().subscribe(
      (cursos)=>{
        this.cursos = cursos;
    });
  }


  onSubmit(){      
    this.loading = true;

    let actividad = new Actividad(
      this.createForm.controls["titulo"].value.toLocaleLowerCase(),
      this.createForm.controls["tipo"].value.toLocaleLowerCase(),
      this.createForm.controls["curso"].value,
      this.createForm.controls["media"].value,
      this.preguntas,
    );

    console.log(this.createForm.controls.media.value, actividad);
    
    
    //Coje la lista de todas las actividades del curso seleccionado
    this.actividadesSer.getAllActividadesOfCurso$(this.createForm.controls["curso"].value+"").subscribe(
      (actividades:Actividad[]) =>{      
      //ASIGNA
      //El id a actividades
      //Si lista actividades viene vacio y la rellenamos o añadimos
      if(this.editMode){
        actividad.id = this.actividadEdit.id;
      }else{
        if(!actividades){
          actividad.id = (Math.floor(Math.random() * 99999)+1).toString()
          actividades = [];
        }else{
          actividad.id = (actividades.length + Math.floor(Math.random() * 99999)+1).toString();
        }
      }
      
        
      //AÑADE
      //Segun el tipo de actividad, el archivo a la BDz      
        if(((this.typeActiviti === "describir" || this.typeActiviti === "otros") && this.fileUpload)){
          this.uploadImg(actividad.id!).then((resp:any)=>{                
            this.upFileSer.downloadImg("actividades",resp.metadata.name).then(
              (url) => {
                actividad.media = url;
                
                if(this.editMode){
                  //EDITA EN BD
                  let posActividad = actividades.findIndex((act)=> act.id == actividad.id)
                  actividades[posActividad] = actividad;                  
                  this.editToBD(actividades);
                }
                else{
                //AGREGA A BD
                  actividades.push(actividad);
                  this.addToBD(actividades);
                }
              });
            });            
        }
        else{
          if(this.editMode){
            //EDITA EN BD
            let posActividad = actividades.findIndex((act)=> act.id == actividad.id)
            actividades[posActividad] = actividad;

            console.log(actividades);
            
            this.editToBD(actividades);
          }else{
            //AGREGA A BD
            actividades.push(actividad);
            this.addToBD(actividades);
          }
        }   

      }
    );
  }

  
  //AGREGA A BD
  //La lista actividades al curso seleccionado
  addToBD(actividades:Actividad[]){
    this.actividadesSer.addActividades(actividades,this.createForm.value.curso+"").subscribe(
      (resp)=>{
        console.log(resp);

        Swal.fire({
          title: 'Creado',
          text: 'Creado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          timer: 1500,
        });

        this.createForm.reset();
        this.typeActiviti = "";
        this.preguntas = [];
        this.loading = false;
      }
    );
  }

  //EDITA EN BD
  editToBD(actividades:Actividad[]){
    let posCurso = this.cursos.findIndex((c)=>c.id == this.createForm.controls["curso"].value);    
    
    this.actividadesSer.updateActividades(actividades,this.cursos[posCurso]).subscribe(
      (resp) =>{
        console.log(resp);

        Swal.fire({
          title: 'Editado',
          text: 'Editado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          timer: 1500,
        });

        this.router.navigate(["/actividades/editar"]);
      }
    )
  }

  onChangeType(type:"describir"|"video"|"otros"|string){
    this.preViewVideo = "";
    this.preViewImg = "";
    this.toPreViewImg = "";
    this.createForm.controls["media"].reset();

    this.typeActiviti = type;
  }

// MEDIA ************************************************************************
  
  preView(){
    switch (this.typeActiviti) {
      case "video":
        if(this.createForm.value.media){
          let newUrlYoutube:string = "https://www.youtube.com/embed/";
          let queryIdVideo:string = 
            this.createForm.value.media.slice(
              this.createForm.value.media.indexOf("v=")+2,
              this.createForm.value.media.indexOf("&") != -1 ? this.createForm.value.media.indexOf("&") : this.createForm.value.media.length)

          let queryTimeVideo:string = 
            this.createForm.value.media.indexOf("&") != -1 
              ? this.createForm.value.media.slice(this.createForm.value.media.indexOf("&")+3) 
              : ""

          newUrlYoutube += queryIdVideo

          this.preViewVideo = this.sanitizer.bypassSecurityTrustResourceUrl(newUrlYoutube)
        }
        break;
      case "describir":
        this.preViewImg = this.toPreViewImg;
        break;
    }
  }
  
  onChangeImage(event:any){
    let reader = new FileReader();
    this.fileUpload = event.srcElement.files[0]

    if(!this.fileUpload ){return}    

    reader.readAsDataURL(this.fileUpload );
    reader.onloadend = () => {
      this.toPreViewImg = this.sanitizer.bypassSecurityTrustUrl(`${reader.result}`);
    }
  }

  onChangePdf(event:any){
    this.fileUpload = event.srcElement.files[0]
  }

  async uploadImg(idActividad:string){
    return await this.upFileSer.uploadImg(this.fileUpload,"actividades",idActividad + this.createForm.controls["curso"].value)
  }

// RESPUESTAS ************************************************************************

  addRespuesta(){
    
    if(!this.createForm.controls["respuestas"].value.respuesta){
      alert("Debe de escribir una respuesta");
      return
    }

    this.respuestas.push(
      {
        respuesta:this.createForm.value.respuestas.respuesta,
        correcta:this.createForm.value.respuestas.correcta?true:false,
      }
    );   

    this.createForm.controls["respuestas"].reset()
    
  }

  changeCorrecta(correcta:boolean,index:number){
    this.respuestas[index].correcta = !correcta;    
  }

  deleteRespuesta(index:number){
    this.respuestas.splice(index,1);
  }
  
// PREGUNTAS ************************************************************************
  
  //modificar
  guardarPreguntas(){
    let countCorrect = 0
    this.respuestas.forEach(item =>{
      if(item.correcta == true)
        countCorrect++;
    });

    if(countCorrect == 1){
      this.preguntas.push(
        {
          enunciado:this.createForm.value.enunciado,
          respuestas:this.respuestas,
        }
      );
      
      this.respuestas = []
      this.createForm.controls["enunciado"].reset();

    }else{
      alert("Error, hay mas de una respuesta correcta o no hay ninguna")
    }
  }

  deletePregunta(index:number){
    this.preguntas.splice(index,1);
  }

  //EDITAR ************************************************************************
    editActividad(){
      const position = this.route.snapshot.params["id"];
      const idCurso = this.route.snapshot.fragment;
  
      this.actividadesSer.getActividad$(idCurso,position).subscribe(
        (actividad)=>{
          if(actividad){
            this.actividadEdit = actividad;

            this.createForm.controls["titulo"].setValue(actividad.title); 
            this.createForm.controls["tipo"].setValue(actividad.type);
            this.createForm.controls["tipo"].disable()
            this.typeActiviti = this.actividadEdit.type;
            this.createForm.controls["curso"].setValue(actividad.curso);
            this.createForm.controls["curso"].disable()
            this.preguntas = actividad.preguntas;
            this.createForm.controls["media"].clearValidators();  
            
            if(this.typeActiviti === "video"){
              this.createForm.controls["media"].setValue(actividad.media);
              this.preViewVideo = this.sanitizer.bypassSecurityTrustResourceUrl(actividad.media)
            }else if(this.typeActiviti === "describir"){
              this.toPreViewImg = actividad.media;
              this.preViewImg = this.sanitizer.bypassSecurityTrustUrl(actividad.media)
            }

            this.loading = false;
          } else {
            this.router.navigate(["actividades/crear"]);
          }
        }, 
      );
  

    }
}


