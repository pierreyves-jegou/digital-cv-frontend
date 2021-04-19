import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {IExperience} from '../model/IExperience';
import {ICv} from '../model/ICv';
import {Cv} from '../model/impl/cv';
import {Experience} from '../model/impl/experience';
import {IDuty} from '../model/IDuty';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { map, filter, mergeMap } from 'rxjs/operators';
import {CvService} from '../cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {


  @Input() cv!: ICv;

  experiences: Observable<Experience[]>;
  defaultJobTitle = 'Balayeur';

  constructor(private route: ActivatedRoute, private cvService: CvService) {
    console.log('constr expe');
    this.experiences = this.initExp2();
  }

  loadCv(): void{

    this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      }),
      // @ts-ignore
      filter( (param: string | null) => {
        if (param == null || param === 'new'){
          return false;
        }else{
          return true;
        }
      }),
      // @ts-ignore
      mergeMap((id: string, index: number) => {
        console.log('pass dabns mergheMap');
        const idAsInt: number = +id;
        return this.cvService.getById(idAsInt);
      })
    ).subscribe(
      (cv: Cv) => {
        this.experiences = new Observable<Experience[]>(observer => {
          // @ts-ignore
          observer.next(cv.experiences);
          observer.complete();
        });
      }
    );
  }

  // initExp2(): Observable<IExperience[]>{
  //   return new Observable<IExperience[]>(observer => {
  //     const experiences: IExperience[] = new Array();
  //     experiences.push(new Experience(null, 'CGI', new Array(), null, null, null,
  //       'Dév'));
  //     experiences.push(new Experience(null, 'Sopra', new Array(), null, null, null,
  //       'Dév'));
  //     observer.next(experiences);
  //     observer.complete();
  //   });
  // }

  initExp(): Promise<IExperience[]>{
    return new Promise((resolve, reject) => {
      const experiences: IExperience[] = new Array();
      experiences.push(new Experience(null, 'CGI', new Array(), null, null, null,
        'Dév'));
      experiences.push(new Experience(null, 'Sopra', new Array(), null, null, null,
        'Dév'));
      resolve(experiences);
    });
  }

  ngOnInit(): void {
    console.log('init expe');
    this.loadCv();
    const experiences: IExperience[] = new Array();
    experiences.push(new Experience(null, 'CGI', new Array(), null, null, null,
      'Dév'));
    this.cv = new Cv(experiences, null);
  }

  test($event: any): void{
    console.log('parent');
    console.log($event);
    console.log('fin parent');
  }

}
