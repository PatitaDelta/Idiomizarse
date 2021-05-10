import { HttpService } from 'src/app/services/http.service';

import { Actividad } from 'src/app/models/actividad';
import { CursosService } from './../cursos/cursos.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private listIdCursosOwn: string[] = (JSON.parse(localStorage.getItem("alumno") || localStorage.getItem("profesor")!)).cursos || []
  private myActividades$ = new Subject<Actividad[]>()

  constructor(private httpSer:HttpService) { }

  getActividadesOf$(){
    let listOfActivities:Actividad[] = []

    this.listIdCursosOwn.forEach(cursoID => {
        this.httpSer.getPropertyOf("cursos",cursoID,"actividades").subscribe(actividad =>{
          listOfActivities.push(actividad);
          this.myActividades$.next(listOfActivities);
        });    
    });
    
    return this.myActividades$;
  }
}
