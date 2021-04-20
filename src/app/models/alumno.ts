
export class Alumno {
  constructor(
    public email:string,
    private password:string,
    private fechaInicio:Date,
    private id?:string,
    public  name?:string,
    private apellido1?:string,
    private apellido2?:string,
    public  foto?:BinaryType,
    private genero?:string,
  ){}


}
