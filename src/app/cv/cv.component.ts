import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IExperience} from '../model/IExperience';
import {ICv} from '../model/ICv';
import {Cv} from '../model/impl/cv';
import {Experience} from '../model/impl/experience';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { map, filter, mergeMap, defaultIfEmpty, tap} from 'rxjs/operators';
import {CvService} from '../cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  @Input() cv!: ICv;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private cvService: CvService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
    });
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
        const exp: Experience[] = [Experience.emptyExperience()];
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



  onSubmit(): void {
    if (this.form.valid){
      const expForms = this.form.get('experiencesForm') as FormArray;
      expForms.controls.forEach(expForm => {
        console.log(expForm.value.companyLabel);
      });
    }
  }


}
