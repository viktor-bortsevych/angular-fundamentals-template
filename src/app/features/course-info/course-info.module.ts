import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [
    CommonModule,
    ButtonComponent
  ],
  exports: [CourseInfoComponent]
})
export class CourseInfoModule { }