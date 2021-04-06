import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  formGroup: FormGroup;

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
    console.log(this.formGroup);
  }

}
