import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService implements OnInit {
  // private urlEndPoint: string = 'http://192.168.18.50:8080/api/';
  private urlEndPoint: string = 'https://idiomizarsebd-default-rtdb.firebaseio.com/';
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  //************************************************************************************************
  //* GET ******************************************************************************************
  //************************************************************************************************

  getAll(nameTable: string) {
    return this.http.get<any>(this.urlEndPoint + "/" + nameTable + ".json")
      .pipe(
        map(response => {
          let returnArray = [];
          for (let id in response) {
            if (response.hasOwnProperty(id)) {
              returnArray.push({ id: id, ...response[id] })
            }
          }
          return returnArray;
        })
      )
  }

  getById(nameTable: string, id: string) {
    return this.http.get<{ [key: string]: any }>(this.urlEndPoint + "/" + nameTable+ "/"+ id + ".json")
      .pipe(
        map(response => {
          let returnArray = [];
          for (let id in response) {
            if (response.hasOwnProperty(id)) {
              returnArray.push({ id: id, ...response[id] })
            }
          }
          return returnArray;
        })
      )
  }

  getByEmail(nameTable: string, email: string) {
    return this.http.get<{ [key: string]: any }>(this.urlEndPoint + "/" + nameTable+ "/"+ email + ".json")
      .pipe(
        map(response => {
          let returnArray = [];
          for (let id in response) {
            if (response.hasOwnProperty(id)) {
              returnArray.push({ id: id, ...response[id] })
            }
          }
          return returnArray;
        })
      )
  }


  //************************************************************************************************
  //* POST ******************************************************************************************
  //************************************************************************************************

  post(nameTable: string, item: Object) {
    return this.http.post(this.urlEndPoint + "/" + nameTable + ".json",
      item
    )
  }

  //************************************************************************************************
  //* PUT ******************************************************************************************
  //************************************************************************************************

  putById(nameTable: string, item: Object, id:string){
    return this.http.put(this.urlEndPoint + "/" + nameTable+ "/"+ id + ".json",
      item
    )
  }

  //************************************************************************************************
  //* DELETE ******************************************************************************************
  //************************************************************************************************

  deleteAll(nameTable: string) {
    return this.http.delete(this.urlEndPoint + "/" + nameTable + ".json")
  }

  deleteById(nameTable: string, id: string) {
    return this.http.delete(this.urlEndPoint + "/" + nameTable+ "/"+ id + ".json")
  }

}
