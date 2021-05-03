import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Experience} from '../model/impl/experience';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit {

  // @ts-ignore
  @Input() experiences$: Observable<Experience[]>;
  experiences: Experience[] = new Array();

  constructor() { }

  ngOnInit(): void {
    this.ngInitExperiences();
  }

  ngInitExperiences(): void {
    if (this.experiences$ != null){
      this.experiences$.subscribe(exps => {
        this.experiences = exps;
      });
    }else{
      this.experiences.push(Experience.emptyExperience());
    }
  }

  addExperience(position: number): void {
    this.experiences.splice(position + 1, 0, Experience.emptyExperience());
  }

  deleteExperience(position: number): void {
    this.experiences.splice(position, 1);
  }

}
