import { Injectable } from '@angular/core';
import {Cv} from './model/impl/cv';
import {IExperience} from './model/IExperience';
import {Experience} from './model/impl/experience';
import {Observable} from 'rxjs';
import {Duty} from './model/impl/duty';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200, http://localhost:8080',
    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE',
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
  });

  constructor(private httpClient: HttpClient) { }

  getById(id: string): Observable<Cv> | null{
    return this.httpClient.get('http://localhost:8080/cv/' + encodeURIComponent(id), {headers: this.headers})
      .pipe(
        map(data => {
          return data as Cv;
        })
      );
  }

  createCv(cv: Cv): Observable<Cv>{
    return this.httpClient.post('http://localhost:8080/cv/', cv)
      .pipe(
        tap(data => console.log(data)),
        map(data => {
          return data as Cv;
        })
      );
  }

}
