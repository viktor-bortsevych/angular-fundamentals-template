import { Component } from '@angular/core';
import { mockedCoursesList } from '@shared/mocks/mocks';

@Component({
  selector: 'courses-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: any[] = mockedCoursesList;
  selectedCourse: any = null;

  onShowCourse(id: string) {
    this.selectedCourse = this.courses.find(course => course.id === id);
  }

  onBack() {
    this.selectedCourse = null;
  }
}
