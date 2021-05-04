import {Component, OnInit, Output, EventEmitter, Input, forwardRef, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
  Validator,
  ValidationErrors
} from '@angular/forms';
import {Experience} from '../model/impl/experience';
import {Duty} from '../model/impl/duty';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExperienceComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExperienceComponent),
      multi: true
    }
  ]
})
export class ExperienceComponent implements OnInit, ControlValueAccessor, OnDestroy, Validator  {

  formExperience: FormGroup;
  // @ts-ignore
  @Input() experience: Experience;

  constructor(private formBuilder: FormBuilder) {
    // @ts-ignore
    this.formExperience = this.formBuilder.group({
      id: null,
      companyLabel: '',
      jobTitle: '',
      from: ['', Validators.required],
      to: [''],
      duties: this.formBuilder.array([])
    });
  }

  ngOnInit(): void{
   // this.addNPlus1Duty();
  }

  ngOnDestroy(): void {
  }

  registerOnChange(fn: any): void {
    console.log('on change');
    console.log(fn);
    this.formExperience.valueChanges.subscribe(fn);
  }

  onTouched: any = () => {};
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    console.log(fn);
    this.onTouched = fn;
  }

  writeValue(obj: Experience): void {
    this.formExperience.get('id')?.setValue(obj.id);
    this.formExperience.get('companyLabel')?.setValue(obj.companyLabel);
    this.formExperience.get('jobTitle')?.setValue(obj.jobTitleLabel);
    this.formExperience.get('from')?.setValue(obj.from);
    this.formExperience.get('to')?.setValue(obj.to);
    const dutiesFormArray = this.formExperience.get('duties') as FormArray;
    if (obj.duties && obj.duties.length > 0){
      obj.duties.forEach(duty => {
        dutiesFormArray.push(this.formBuilder.control(duty.detail));
      });
    }else{
      dutiesFormArray.push(this.formBuilder.control(Duty.emptyDuty().detail));
    }

    console.log(this.formExperience.getRawValue());
  }

  addDuty(position: number): void{
    const dutiesControls = this.getDutiesControls();
    dutiesControls.splice(position + 1, 0, this.formBuilder.control(''));
    console.log(position);
  }

  removeDuty(position: number): void{
    const dutiesControls = this.getDutiesControls();
    dutiesControls.splice(position, 1);
  }

  getDutiesControls(): AbstractControl[]{
    const duties = this.formExperience.get('duties') as FormArray;
    return duties.controls;
  }

  // addNPlus1Duty(): void{
  //   const duties = this.formGroup.get('duties') as FormArray;
  //   duties.valueChanges.subscribe(values => {
  //     const valuesCast = values as string[];
  //     if (valuesCast[valuesCast.length - 1].length > 0){
  //       duties.push(this.formBuilder.control(''));
  //     }
  //     console.log(values);
  //     valuesCast.forEach(val => {
  //       console.log(val);
  //     });
  //   });
  // }

  getTitle(): string{
    const titleValues: string[] = new Array();
    if (this.formExperience.get('companyLabel')?.value){
      titleValues.push(this.formExperience.get('companyLabel')?.value);
    }

    if (this.formExperience.get('jobTitle')?.value){
      titleValues.push(this.formExperience.get('jobTitle')?.value);
    }

    return titleValues.join(' - ');
  }

  validate(c: AbstractControl): ValidationErrors | null{
    console.log('sic Info validation', c);
    return this.formExperience.valid ? null : { invalidForm: {valid: false, message: 'basicInfoForm fields are invalid'}};
  }

}
