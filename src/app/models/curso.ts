import { Actividad } from 'src/app/models/actividad';

export class Curso {
  constructor(
    public id:string,
    public name:string,
    public idioma:string,
    public actividades?:Actividad[], // Contiene las actividades envevidas
    public description?:string,
    public hours?:number,
    public minutes?:number,
    public image?:File,
    public alumnosSubs?:string[], // Contiene las id de los usuarios subscritos
  ){}
}
