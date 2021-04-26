export class Profesor {
  constructor(
    public email:string,
    public password:string,
    public fechaInicio:Date,
    public id?:string,
    public schedule?:string,
    public  name?:string,
    public apellido1?:string,
    public apellido2?:string,
    public  foto?:BinaryType,
    public phone?:number,
    public genero?:string,
  ){}
}
