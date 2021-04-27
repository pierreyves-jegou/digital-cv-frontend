import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IExperience} from '../model/IExperience';
import {IDuty} from '../model/IDuty';
import {Experience} from '../model/impl/experience';
import {Duty} from '../model/impl/duty';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, ControlValueAccessor {

  formGroup: FormGroup;
  @Input() initExperience!: Experience;
  // @ts-ignore
  @Input() formParent: FormGroup;
  @Output() experience = new EventEmitter<IExperience>();


  constructor(private formBuilder: FormBuilder) {
    console.log('constr expe');

    this.formGroup = this.formBuilder.group({
      companyLabel : this.initExperience?.companyLabel != null ? this.initExperience?.companyLabel : null,
      jobTitle : '',
      from : ['' , Validators.required],
      to : [''],
      duties : this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  }

  writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit(): void{
    console.log('init expe');
    this.initFormGroup();
    this.addNPlus1Duty();
    // @ts-ignore
    this.formParent.addControl('', this.formGroup);
    this.formGroup.setParent(this.formParent);
  }

  initFormGroup(): void{
    const companyLabel = this.formGroup.get('companyLabel') as FormControl;
    companyLabel.setValue(this.initExperience?.companyLabel != null ? this.initExperience?.companyLabel : '');
    const jobTitleControl = this.formGroup.get('jobTitle') as FormControl;
    jobTitleControl.setValue(this.initExperience?.jobTitleLabel != null ? this.initExperience?.jobTitleLabel : '');

    const dutiesControl = this.formGroup.get('duties') as FormArray;
    if (this.initExperience?.duties) {
      this.initExperience.duties.forEach((value, key) => {
        dutiesControl.insert(key, this.formBuilder.control(value));
        // dutiesControl.push(this.formBuilder.control(duty));
      });
    }
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



}
