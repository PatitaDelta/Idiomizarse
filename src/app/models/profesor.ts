

export class Profesor {
  constructor(
    public email:string,
    public password:string,
    public fechaInicio:string,
    public cursos:string[], // Contiene las id de los cursos
    public id?:string,
    public uid?: string,
    public schedule?:string,
    public  name?:string,
    public apellido1?:string,
    public apellido2?:string,
    public  foto?:BinaryType,
    public phone?:number,
    public genero?:string,
  ){}
}
