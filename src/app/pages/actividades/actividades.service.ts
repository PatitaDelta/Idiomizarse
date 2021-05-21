import { CursosService } from './../cursos/cursos.service';
import { HttpService } from 'src/app/services/http.service';

import { Actividad } from 'src/app/models/actividad';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Curso } from 'src/app/models/curso';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private myActividades$ = new Subject<Actividad[]>()
  private myCursos$ = new Subject<Curso[]>();

  constructor(private httpSer:HttpService, private cursosSer:CursosService) { }

  getAllActividadesOfUser$(){
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

  getAllActividadesOfCurso$(cursoID:string){
    return this.httpSer.getPropertyOf("cursos",cursoID,"actividades")
  }

  getCursosOf$(){
    this.myCursos$ = this.cursosSer.getCursosOf$()
    return this.myCursos$;
  }

  addActividades(actividades:Actividad[], idCurso:string){
    return this.httpSer.putPropertyById("cursos",idCurso,"actividades",actividades)
  }
}
