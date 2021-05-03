import { Injectable } from '@angular/core';
import {Cv} from './model/impl/cv';
import {IExperience} from './model/IExperience';
import {Experience} from './model/impl/experience';
import {Observable} from 'rxjs';
import {Duty} from './model/impl/duty';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor() { }

  getById(id: number): Observable<Cv> | null{
    if (id === 1){
      const experiences: IExperience[] = new Array();


      const dutyArchi: Duty = new Duty(1, 'archi');
      experiences.push(new Experience(1, null, 'CGI', [dutyArchi], null, null, null,
        'Dév'));
      experiences.push(new Experience(2 , null, 'Sopra', new Array(), null, null, null,
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
