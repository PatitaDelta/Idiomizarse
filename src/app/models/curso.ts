
export class Curso {
  constructor(
    public name:string,
    public difficulty:string,
    public price:number,
    public id:string,
    public description?:string,
    public hours?:number,
    public minutes?:number,
    public image?:ImageBitmap,
  ){}
}
