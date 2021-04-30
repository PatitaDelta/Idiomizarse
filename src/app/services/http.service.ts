import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private urlEndPoint: string = environment.bd_url;
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  //************************************************************************************************
  //* GET ******************************************************************************************
  //************************************************************************************************

  getAll(nameTable: string): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(this.urlEndPoint + "/" + nameTable + ".json")
      .pipe(
        map((response) => {
          let returnArray = []; 

          for (const key in response) {
            let idItem = key
            if (response.hasOwnProperty(key)) {
              returnArray.push({...response[key], id: idItem})
            }
          }

          return returnArray;
        }),        
      )
  }

  getById(nameTable: string, id: string): Observable<any> {
    return this.http.get<{ [key: string]: any }>(this.urlEndPoint + "/" + nameTable + "/" + id + ".json")
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

  getByEmail(nameTable: string, email: string): Observable<any> {
    return this.http.get<{ [key: string]: any }>(this.urlEndPoint + "/" + nameTable + "/" + email + ".json")
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

  post(nameTable: string, item: any): Observable<any> {
    return this.http.post(this.urlEndPoint + "/" + nameTable + ".json",
      item
    ).pipe(
      map((resp:any) =>{
        item.id = resp.name;
      }),
      
    );
    
  }

  //************************************************************************************************
  //* PUT ******************************************************************************************
  //************************************************************************************************

  putById(nameTable: string, item: Object, id: string): Observable<any> {
    return this.http.put(this.urlEndPoint + "/" + nameTable + "/" + id + ".json",
      item
    )
  }

  //************************************************************************************************
  //* DELETE ******************************************************************************************
  //************************************************************************************************

  deleteAll(nameTable: string): Observable<any> {
    return this.http.delete(this.urlEndPoint + "/" + nameTable + ".json")
  }

  deleteById(nameTable: string, id: string): Observable<any> {
    return this.http.delete(this.urlEndPoint + "/" + nameTable + "/" + id + ".json")
  }

}
