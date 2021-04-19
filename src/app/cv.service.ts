import { Injectable } from '@angular/core';
import {Cv} from './model/impl/cv';
import {IExperience} from './model/IExperience';
import {Experience} from './model/impl/experience';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor() { }

  getById(id: number): Observable<Cv> | null{
    if (id === 1){
      const experiences: IExperience[] = new Array();
      experiences.push(new Experience(null, 'CGI', new Array(), null, null, null,
        'Dév'));
      experiences.push(new Experience(null, 'Sopra', new Array(), null, null, null,
        'Dév'));
      return new Observable(observer => {
        observer.next(new Cv(experiences, null));
        observer.complete();
      });
    }else{
      return new Observable(observer => {
        observer.complete();
      });
    }
  }

}
