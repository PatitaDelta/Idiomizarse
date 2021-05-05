import { Curso } from "./curso";

export class Alumno {
  constructor(
    public email: string,
    public password: string,
    public fechaInicio: string,
    public cursos:Curso[],
    public id?: string,
    public uid?: string,
    public name?: string,
    public apellido1?: string,
    public apellido2?: string,
    public foto?: BinaryType,
    public genero?: string,
  ) { }

  get fullName(){
    return `${this.name} ${this.apellido1} ${this.apellido2} `; 
  }
}
