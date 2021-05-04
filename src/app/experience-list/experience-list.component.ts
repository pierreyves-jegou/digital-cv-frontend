import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Experience} from '../model/impl/experience';
import {ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit, ControlValueAccessor {

  // @ts-ignore
  @Input() experiences$: Observable<Experience[]>;
  // @ts-ignore
  formExperiences: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // @ts-ignore
   this.formExperiences = this.formBuilder.group({
      elements: this.formBuilder.array([])
    });
  }

  registerOnChange(fn: any): void {
    this.formExperiences.valueChanges.subscribe(fn);
  }

  onTouched: any = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
  }

  ngOnInit(): void {
    this.ngInitExperiences();
  }

  ngInitExperiences(): void {
    if (this.experiences$ != null){
      this.experiences$.subscribe(exps => {
        exps.forEach(exp => {
          this.elements.push(this.formBuilder.control(exp));
        });
      });
    }else{
      this.elements.push(this.formBuilder.control(Experience.emptyExperience()));
    }
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

  test(): void {
    console.log(this.formExperiences);
    console.log(this.formExperiences.getRawValue());
  }

}
