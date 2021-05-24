import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Experience} from '../model/impl/experience';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExperienceListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExperienceListComponent),
      multi: true
    }
  ]
})
export class ExperienceListComponent implements OnInit, ControlValueAccessor, Validator {

  // @ts-ignore
  @Input() experiences$: Observable<Experience[]>;
  // @ts-ignore
  formExperiences: FormGroup;
  // @Input() parentForm: FormGroup | undefined;


  constructor(private formBuilder: FormBuilder) {
    // @ts-ignore
   this.formExperiences = this.formBuilder.group({
      elements: this.formBuilder.array([], Validators.required)
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // console.log(this.formExperiences.valid ? null : { invalidForm: {valid: false, message: 'basicInfoForm fields are invalid'}});
    return this.formExperiences.valid ? null : { invalidForm: {valid: false, message: 'basicInfoForm fields are invalid'}};
  }

  registerOnChange(fn: any): void {
    this.formExperiences.valueChanges.subscribe(fn);
  }

  onTouched: any = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(exps: Experience[]): void {
    this.elements.clear();
    if (exps && exps.length > 0){
      exps.forEach(exp => {
        this.elements.push(this.formBuilder.control(exp));
      });
    }else{
      this.elements.push(this.formBuilder.control(Experience.emptyExperience()));
    }
  }

  ngOnInit(): void {
  }

  addExperience(position: number): void {
    this.elements.insert(position + 1, this.formBuilder.control(Experience.emptyExperience()));
  }

  deleteExperience(position: number): void {
    this.elements.removeAt(position);
  }

  get elements(): FormArray{
    return this.formExperiences.get('elements') as FormArray;
  }
}
