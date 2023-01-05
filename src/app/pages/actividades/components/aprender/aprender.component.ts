import { ActividadesService } from './../../actividades.service';
import { Actividad } from 'src/app/models/actividad';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-aprender',
  templateUrl: './aprender.component.html',
  styles: [
  ]
})
export class AprenderComponent implements OnInit {

  public activitiType: string = this.route.snapshot.params["type"];
  public actividad!: Actividad;
  public actividadesCorrectas:string[] = [];

  public mediaSanaticer!:any;
  public preguntasForm:FormGroup = new FormGroup({ })
  public formSend:boolean = false;

  constructor(
    private actividadesSer: ActividadesService,
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer, ) { }

  ngOnInit(): void {
    const activitiID = this.route.snapshot.params["id"];
    const idCurso: string = this.route.snapshot.fragment;

    this.actividadesSer.getAllActividadesOfCurso$(idCurso).subscribe(
      (actividades: Actividad[]) => {
        this.actividadesSer.getActividad$(idCurso, actividades.findIndex(act => act.id == activitiID) + "").subscribe(
          (actividad: Actividad) =>{
            if(this.activitiType === 'video' || this.activitiType === 'otros')
              this.mediaSanaticer = this.sanitizer.bypassSecurityTrustResourceUrl(actividad.media);

            for (let i = 0; i < actividad.preguntas.length; i++) {
              this.preguntasForm.setControl(i+"",
                new FormControl(null,[Validators.required])
              );
            }
            actividad.preguntas = this.randomiceList(actividad.preguntas);

            actividad.preguntas.forEach(pregunta =>{
              let respCorrecta = pregunta.respuestas.find(resp => resp.correcta)
              this.actividadesCorrectas.push(respCorrecta?.respuesta!);
            })

            this.actividad = actividad; 
          }

        );
      }
    );
  }

  comprobarResultado() {
    this.formSend = true

    for (let i = 0; i < this.actividadesCorrectas.length; i++) {
      let card = document.getElementById(i+"correcta");
      let cardIcon = document.getElementById(i+"icon");

      if(this.preguntasForm.controls[i].value === this.actividadesCorrectas[i]){
        card?.setAttribute("class","card-header bg-custom-orange d-flex justify-content-between bg-success");
        cardIcon?.setAttribute("class","bi bi-check-all mx-2");
      }
      else {
        card?.setAttribute("class","card-header bg-custom-orange d-flex justify-content-between bg-danger");
        cardIcon?.setAttribute("class","bi bi-x mx-2");
      }
    }
  }

  randomiceList(array:any[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

}
