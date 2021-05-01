import {Component, OnInit, Output, EventEmitter, Input, forwardRef} from '@angular/core';
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
export class ExperienceComponent implements OnInit, ControlValueAccessor, Validator {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      companyLabel: '',
      jobTitle: '',
      from: ['', Validators.required],
      to: [''],
      duties: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('validate');
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'basicInfoForm fields are invalid'}};
  }

  writeValue(exp: Experience): void {
      this.formGroup.get('companyLabel')?.setValue(exp.companyLabel);
      this.formGroup.get('jobTitle')?.setValue(exp.jobTitleLabel);
      this.formGroup.get('from')?.setValue(exp.from);
      this.formGroup.get('to')?.setValue(exp.to);
      const duties = this.formGroup.get('duties') as FormArray;
      exp.duties.forEach(duty => {
        duties.push(this.formBuilder.control(duty.detail));
      });
    }
    registerOnChange(fn: any): void {
      console.log('registerOnChange');
      this.formGroup.valueChanges.subscribe(fn);
    }

  public onTouched: () => void = () => {};

    registerOnTouched(fn: any): void {
      console.log('registerOnTouched');
      console.log(fn);
      this.onTouched = fn;
    }

  ngOnInit(): void{
    this.addNPlus1Duty();
  }


  addDuty(position: number): void{
    const dutiesControls = this.getDutiesControls();
    dutiesControls.splice(position, 0, this.formBuilder.control(''));
    console.log(position);
  }

  removeDuty(position: number): void{
    const dutiesControls = this.getDutiesControls();
    dutiesControls.splice(position, 1);
  }

  getDutiesControls(): AbstractControl[]{
    const duties = this.formGroup.get('duties') as FormArray;
    return duties.controls;
  }

  addNPlus1Duty(): void{
    const duties = this.formGroup.get('duties') as FormArray;
    duties.valueChanges.subscribe(values => {
      const valuesCast = values as string[];
      if (valuesCast[valuesCast.length - 1].length > 0){
        duties.push(this.formBuilder.control(''));
      }
      console.log(values);
      valuesCast.forEach(val => {
        console.log(val);
      });
    });
  }

  getTitle(): string{
    const titleValues: string[] = new Array();
    if (this.formGroup.get('companyLabel')?.value){
      titleValues.push(this.formGroup.get('companyLabel')?.value);
    }

    if (this.formGroup.get('jobTitle')?.value){
      console.log('this.formGroup.get(\'jobTitle\')');
      console.log(this.formGroup.get('jobTitle')?.value);
      titleValues.push(this.formGroup.get('jobTitle')?.value);
    }

    return titleValues.join(' - ');
  }

}
