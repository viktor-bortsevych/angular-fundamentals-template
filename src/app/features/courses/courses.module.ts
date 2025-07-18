import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

@NgModule({
  declarations: [CoursesListComponent, CourseInfoComponent, CoursesComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoursesComponent],
  providers: [],
  bootstrap: [],
})
export class CoursesModule {}
