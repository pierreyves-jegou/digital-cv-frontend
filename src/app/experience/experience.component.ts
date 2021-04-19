import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IExperience} from '../model/IExperience';
import {IDuty} from '../model/IDuty';
import {Experience} from '../model/impl/experience';
import {Duty} from '../model/impl/duty';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  formGroup: FormGroup;
  @Input() initExperience!: Experience;
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

  ngOnInit(): void{
    console.log('init expe');
    this.initFormGroup();
    this.addNPlus1Duty();
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

  onSubmit(): void {
    if (this.formGroup.valid) {
      const duties: IDuty[] = this.getDutiesControls()
        .filter(x => x.value)
        .map(x => new Duty(x.value))
        .reduce((acc, currentValue) => {
          if (acc.indexOf(currentValue) === -1) {
            acc.push(currentValue);
          }
          return acc;
        }, new Array());



      const exp: IExperience = new Experience(
        null,
        this.formGroup.get('companyLabel')?.value,
        new Array(),
        this.formGroup.get('from')?.value,
        this.formGroup.get('to')?.value,
        null,
        this.formGroup.get('jobTitle')?.value
      );
      this.experience.emit(exp);
      console.log(exp);
    }else{
      console.log('not valide');
    }
    console.log(this.formGroup);
  }

}
