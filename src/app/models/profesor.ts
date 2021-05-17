export class Profesor {
  constructor(
    public email:string,
    public password:string,
    public fechaInicio:string,
    public cursos:string[], // Contiene las id de los cursos
    public id?:string,
    public uid?: string,
    public dni?:string,
    public name?:string,
    public horary?:string,
    public location?: string,
    public phone?:number,
    public foto?:BinaryType,
    public languages?:string[],
  ){}

}
