import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Experience} from '../model/experience';
import {Duty} from '../model/duty';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  formGroup: FormGroup;
  @Output() newExperienceEvent = new EventEmitter<Experience>();

  constructor(private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      company : '',
      jobTitle : '',
      from : ['' , Validators.required],
      to : [''],
      duties : this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
    this.observeDutiesControls();
  }

  ngOnInit(): void {
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

  observeDutiesControls(): void{
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
    if(this.formGroup.valid){
      const duties: Duty[] = this.getDutiesControls()
        .filter(x => x.value)
        .map(x => new Duty(x.value))
        .reduce(function(acc, currentValue) {
          if (acc.indexOf(currentValue) === -1) {
            acc.push(currentValue);
          }
          return acc;
        }, new Array());



      const exp: Experience = new Experience(
        null,
        this.formGroup.get('company')?.value,
        null,
        this.formGroup.get('jobTitle')?.value,
        this.formGroup.get('from')?.value,
        this.formGroup.get('to')?.value,
        duties);

      console.log(exp);
    }else{
      console.log("not valide");
    }
    console.log(this.formGroup);
  }

}
