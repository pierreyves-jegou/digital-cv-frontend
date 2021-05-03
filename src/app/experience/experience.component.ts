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
import {Duty} from '../model/impl/duty';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  formGroup: FormGroup;
  // @ts-ignore
  @Input() experience: Experience;

  constructor(private formBuilder: FormBuilder) {
    // @ts-ignore
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

  ngOnInit(): void{
    this.ngInitExperienceFormFromExperience();
   // this.addNPlus1Duty();
  }

  ngInitExperienceFormFromExperience(): void{
    if (this.experience){
      this.formGroup.get('companyLabel')?.setValue(this.experience.companyLabel);
      this.formGroup.get('jobTitle')?.setValue(this.experience.jobTitleLabel);
      this.formGroup.get('from')?.setValue(this.experience.from);
      this.formGroup.get('to')?.setValue(this.experience.to);
      const duties = this.formGroup.get('duties') as FormArray;
      duties.clear();
      if (this.experience.duties && this.experience.duties.length > 0){
        this.experience.duties.forEach(duty => {
          console.log(duty);
          duties.push(this.formBuilder.control(duty.detail));
        });
      }else{
        duties.push(this.formBuilder.control(Duty.emptyDuty().detail));
      }
    }
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
    const duties = this.formGroup.get('duties') as FormArray;
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
    if (this.formGroup.get('companyLabel')?.value){
      titleValues.push(this.formGroup.get('companyLabel')?.value);
    }

    if (this.formGroup.get('jobTitle')?.value){
      titleValues.push(this.formGroup.get('jobTitle')?.value);
    }

    return titleValues.join(' - ');
  }

}
