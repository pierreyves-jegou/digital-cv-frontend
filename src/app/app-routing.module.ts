import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CvComponent} from './cv/cv.component';

const routes: Routes = [
  { path: 'cv/:id', component: CvComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
