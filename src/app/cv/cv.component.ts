import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IExperience} from '../model/IExperience';
import {ICv} from '../model/ICv';
import {Cv} from '../model/impl/cv';
import {Experience} from '../model/impl/experience';
import {IDuty} from '../model/IDuty';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { of } from 'rxjs';
import { map, filter, mergeMap, defaultIfEmpty, tap} from 'rxjs/operators';
import {CvService} from '../cv.service';
import {Duty} from '../model/impl/duty';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  @Input() cv!: ICv;
  experiences: Observable<IExperience[]>;
  defaultJobTitle = 'Balayeur';
  form: FormGroup;

  constructor(private route: ActivatedRoute, private cvService: CvService) {
    this.form = new FormBuilder().group({});
    console.log('parent form' + this.form);
    console.log(this.form);
    this.experiences = this.loadCv();
  }

  loadCv(): Observable<IExperience[]>{
    // @ts-ignore
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      // @ts-ignore
      filter( (param: string | null) => {
        if (param == null || param === 'new'){
          return false;
        }
        return true;
      }),
      // @ts-ignore
      mergeMap((id: string, index: number) => {
        const exp: Experience[] = [new Experience(null, null, new Array(), null, null, null, null)];
        const cv: Cv = new Cv(exp, null);
        return this.cvService.getById(+id)?.pipe(defaultIfEmpty(cv));
      }),
      map((cv: Cv, index: number) => {
        return cv.experiences;
      })
    );
  }

  ngOnInit(): void {
  }

  test($event: any): void{
    console.log('parent');
    console.log($event);
    console.log('fin parent');
  }


  onSubmit(): void {
    console.log('valid' + this.form.valid);
    console.log(this.form);
  }

}
