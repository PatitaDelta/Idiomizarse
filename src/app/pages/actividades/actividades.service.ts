import { HttpService } from 'src/app/services/http.service';

import { Actividad } from 'src/app/models/actividad';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private myActividades$ = new Subject<Actividad[]>()

  constructor(private httpSer:HttpService) { }

  getActividadesOf$(){
    const listIdCursosOwn: string[] = (JSON.parse(localStorage.getItem("alumno") || localStorage.getItem("profesor")!)).cursos || []
    const listOfActivities:Actividad[] = []

    listIdCursosOwn.forEach(cursoID => {
        this.httpSer.getPropertyOf("cursos",cursoID,"actividades").subscribe(actividad =>{
          listOfActivities.push(actividad);
          this.myActividades$.next(listOfActivities);
        });    
    })
    
    return this.myActividades$;
  }
}
