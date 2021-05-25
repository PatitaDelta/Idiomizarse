import { Pregunta } from './interfaces/pregunta';
export class Actividad{
  constructor(
    public title:string,
    public type:string,
    public curso:string,
    public media:string, //id del archivo imgs, videos o pdf
    public preguntas:Pregunta[], 
    public id?:string,
    ){}
}
