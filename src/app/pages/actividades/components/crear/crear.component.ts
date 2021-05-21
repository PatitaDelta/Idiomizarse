import { Pregunta } from './../../../../models/interfaces/pregunta';
import { ActividadesService } from './../../actividades.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Curso } from './../../../../models/curso';
import { Actividad } from 'src/app/models/actividad';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: []
})
export class CrearActividadesComponent implements OnInit {

  public type:string = ""

  public cursos:Curso[] = [];

  public preguntas:Pregunta[] = []
  public enunciado:string = "";
  public respuestas:{respuesta:string, correcta:boolean}[] =[];

  private fileUpload!:File;

  public toPreViewImg!:any
  public preViewImg!:any
  public preViewVideo!:any

  public typesList:string[] = ["relacionar","video","otros"];
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

  
  constructor(private upFileSer:UploadFilesService, private actividadesSer:ActividadesService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.actividadesSer.getCursosOf$().subscribe(
      (cursos)=>{
        this.cursos = cursos;
    });
  }

  onSubmit(){      

    let actividad = new Actividad(
      this.createForm.value.titulo.toLocaleLowerCase(),
      this.createForm.value.tipo.toLocaleLowerCase(),
      this.createForm.value.curso,
      this.createForm.value.media,
      this.preguntas,
    );

    //Coje la lista de todas las actividades del curso seleccionado
    this.actividadesSer.getAllActividadesOfCurso$(this.createForm.value.curso+"").subscribe(
      (actividades:Actividad[]) =>{

      //COMPRUEBA
      //Si viene vacio y la rellenamos
        if(!actividades){
          actividad.id = (Math.floor(Math.random() * 99999)+1).toString()
          actividades = [];
        }else{
          actividad.id = (actividades.length + Math.floor(Math.random() * 99999)+1).toString();
        }
        
      //EDITA
      //Segun el tipo de activdad
        if((this.type === "relacionar")){
          this.uploadImg(actividad.id).then((resp:any)=>{                
            this.upFileSer.downloadImg("actividades",resp.metadata.name).then(
              (url) => {
                actividad.media = url;
                actividades.push(actividad);
                
                //AÑADE
                this.addToBD(actividades);
              });
            });
        }
        else if(this.type === "otros"){
        
          //AÑADE
          this.addToBD(actividades);
        }else{
          actividades.push(actividad);
          
          //AÑADE
          this.addToBD(actividades);
        }   

      }
    );
  }

  
  //AÑADE
  //La lista actividades al curso seleccionado
  addToBD(actividades:Actividad[]){
    this.actividadesSer.addActividades(actividades,this.createForm.value.curso+"").subscribe((resp)=>{
      console.log(resp);
      this.createForm.reset();
      this.preguntas = [];
    })
  }

  onChangeType(type:"relacionar"|"video"|"otros"){
    this.preViewVideo = "";
    this.preViewImg = "";
    this.toPreViewImg = "";
    this.createForm.controls["media"].reset();

    this.type = type;
  }



// MEDIA ************************************************************************
  
  preView(){
    switch (this.type) {
      case "video":
        if(this.createForm.value.media)
          this.preViewVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.createForm.value.media)
        break;
      case "relacionar":
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

  async uploadImg(idActividad:string){
    return await this.upFileSer.uploadImg(this.fileUpload,"actividades",idActividad + this.createForm.value.curso)
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
}
