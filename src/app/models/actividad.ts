import { Pregunta } from "./pregunta";

export class Actividad{
  constructor(
    public id:string,
    public name:string,
    public preguntas:Pregunta[], //Contiene las id de los cursos
  ){}
}
