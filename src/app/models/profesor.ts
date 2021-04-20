export class Profesor {
  constructor(
    public email:string,
    private password:string,
    private fechaInicio:Date,
    private id?:string,
    private schedule?:string,
    public  name?:string,
    private apellido1?:string,
    private apellido2?:string,
    public  foto?:BinaryType,
    private phone?:number,
    private genero?:string,
  ){}
}
