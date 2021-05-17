export class Alumno {
  constructor(
    public email: string,
    public password: string,
    public fechaInicio: string,
    public cursos:string[],
    public id?: string,
    public uid?: string,
    public dni?:string,
    public name?: string,
    public location?: string,
    public phone?:number,
    public foto?: string,
  ) { }

}
