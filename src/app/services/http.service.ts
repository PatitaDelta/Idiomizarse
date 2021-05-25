import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private urlEndPoint: string = environment.bd_url;
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  get url(){
    return this.urlEndPoint
  }

  get headers(){
    return this.httpHeaders
  }

  constructor(private http: HttpClient) { }


  //************************************************************************************************
  //* GET ******************************************************************************************
  //************************************************************************************************

  getAll(nameTable: string): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(this.url + "/" + nameTable + ".json")
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
    return this.http.get<{ [key: string]: any }>(this.url + "/" + nameTable + "/" + id + ".json")
  }

  getPropertyOf(nameTable: string, id:string, property:string): Observable<any>{    
    return this.http.get<{ [key: string]: any }>(`${this.url}/${nameTable}/${id}/${property}.json`)
  }

  getItemFromPropertyList(nameTable: string, id:string, namelist:string, position:string): Observable<any>{
    return this.http.get<{ [key: string]: any }>(`${this.url}/${nameTable}/${id}/${namelist}/${position}.json`)
  }

  //************************************************************************************************
  //* POST ******************************************************************************************
  //************************************************************************************************

  post(nameTable: string, item: any): Observable<any> {
    return this.http.post(this.url + "/" + nameTable + ".json",
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
    return this.http.put(this.url + "/" + nameTable + "/" + id + ".json",
      item
    ).pipe(
      catchError((err)=> throwError(err))
    )
  }

  putPropertyById(nameTable: string, id: string, property:string ,item: Object): Observable<any> {
    return this.http.put(this.url + "/" + nameTable + "/" + id + "/" + property + ".json",
      item
    ).pipe(
      catchError((err)=> throwError(err))
    )
  }

  //************************************************************************************************
  //* DELETE ******************************************************************************************
  //************************************************************************************************

  deleteAll(nameTable: string): Observable<any> {
    return this.http.delete(this.url + "/" + nameTable + ".json")
  }

  deleteById(nameTable: string, id: string): Observable<any> {
    return this.http.delete(this.url + "/" + nameTable + "/" + id + ".json")
  }

  deleteItemInPropertyList(nameTable: string, id: string, propertyList:string, idItem:string): Observable<any>{
    return this.http.delete(`${this.urlEndPoint}/${nameTable}/${id}/${propertyList}/${idItem}/.json`);
  }

}
