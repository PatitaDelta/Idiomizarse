import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import firebase from "firebase/app"

const base_url = environment.bd_url;

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor() { }

  async uploadImg(file:File,type:"users"|"actividades"|"cursos", name:string){

    try {
      //Creacion de la referencia al storage de Firebase
      const storageRef = firebase.storage().ref();

      //Guarda en firebase el archivo
      return await storageRef.child(`${type}/${name}`).put(file);

    } catch (error) {
      console.error("error en la subida de img");
      return false;
    }
  }

  async downloadImg(type:"users"|"actividades"|"cursos", name:string){

    try {
      //Creacion de la referencia al storage de Firebase
      const storageRef = firebase.storage().refFromURL(`gs://idiomizarsebd.appspot.com/${type}/${name}`)

      //Guarda en firebase el archivo
      return await storageRef.getDownloadURL()

    } catch (error) {
      return "../../assets/defaultIMG.svg";
    }

  }

  async deleteImg(type:"users"|"actividades"|"cursos", name:string){
    try {
      //Creacion de la referencia al storage de Firebase
      const storageRef = firebase.storage().ref();

      //Elimina en firebase el archivo
      return await storageRef.child(`${type}/${name}`).delete()

    }catch(error){
      console.error("error al borrar de img");
      return false;
    }
  }

}
