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
  experiences: IExperience[] = new Array();
  experiencesSubject$: BehaviorSubject<Array<IExperience>> = new BehaviorSubject<IExperience[]>(new Array());
  form: FormGroup;

  constructor(private route: ActivatedRoute, private cvService: CvService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      experiencesForm : this.formBuilder.array([])
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
    this.experiencesSubject$.subscribe(exps => {
      console.log('emet');
      console.log(exps);
    });

    this.loadCv().subscribe(exps => {
      this.experiences = exps;
      const formExp = this.form.get('experiencesForm') as FormArray;
      exps.forEach(exp => formExp.push(this.formBuilder.control({
        companyLabel: exp.companyLabel,
        jobTitle: exp.jobTitleLabel,
        from: exp.from,
        to: exp.to,
        duties: exp.duties
      }, [Validators.required])));
      this.experiencesSubject$.next(exps);
    });
  }



  addExperience(position: number): void {
    this.experiences.splice(position , 0, new Experience(null, null, new Array(), null, null, null, ''));
    console.log(this.experiences);
    this.experiencesSubject$.next(this.experiences);
  }

  onSubmit(): void {
    if (this.form.valid){
      const expForms = this.form.get('experiencesForm') as FormArray;
      expForms.controls.forEach(expForm => {
        console.log(expForm.value.companyLabel);
      });
    }
  }

  deleteExperience(position: number): void {
    console.log('delete' + position);
  }
}
