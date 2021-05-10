import { Actividad } from 'src/app/models/actividad';

export class Curso {
  constructor(
    public name:string,
    public difficulty:string,
    public price:number,
    public id:string,
    public actividades?:Actividad[], // Contiene las actividades envevidas
    public description?:string,
    public hours?:number,
    public minutes?:number,
    public image?:ImageBitmap,
  ){}
}
