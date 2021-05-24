import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, NG_VALIDATORS, ValidationErrors, Validators} from '@angular/forms';
import {IExperience} from '../model/IExperience';
import {ICv} from '../model/ICv';
import {Cv} from '../model/impl/cv';
import {Experience} from '../model/impl/experience';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { map, filter, mergeMap, defaultIfEmpty, tap} from 'rxjs/operators';
import {CvService} from '../cv.service';
import {Profile} from '../model/profile.model';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  @Input() cv!: ICv;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private cvService: CvService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      formExperiences : this.formBuilder.control(null)
    });
  }

  loadCv(): Observable<Cv>{
    // @ts-ignore
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      // @ts-ignore
      mergeMap((id: string | null, index: number) => {
        if (id){
          return this.cvService.getById(id);
        }else{
          return this.createCv();
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadCv().subscribe(cv => {
      this.formExperiences.setValue(cv.experiences);
    });
  }

  createCv(): Observable<Cv> {
    return new Observable<Cv>(observer => {
      const cv: Cv = new Cv(null, [Experience.emptyExperience()], Profile.emptyProfile());
      observer.next(cv);
      observer.complete();
    });
  }

  get formExperiences(): FormGroup{
    return this.form.get('formExperiences') as FormGroup;
  }

  onSubmit(): void {
    console.log('sumit');

    const cvUpdated = new Cv(null, [Experience.emptyExperience()], null);
    if (this.cv && this.cv.id){
      cvUpdated.id = this.cv.id;
    }
    cvUpdated.experiences = this.form.getRawValue().formExperiences.elements;
    console.log('going to update');
    console.log(cvUpdated);
    console.log('form');
    console.log(this.form);
    if (!cvUpdated.id){
      this.cvService.createCv(cvUpdated).subscribe(data => {

        console.log('yes');
        console.log(data);
        this.router.navigateByUrl('/cv/' + data.id);
      });
    }else{
      console.log('todo update cv');
    }

  }


}
