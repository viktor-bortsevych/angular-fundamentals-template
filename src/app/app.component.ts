import { Component } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  courses: any[] = mockedCoursesList;
  selectedCourse: any = null;

  onShowCourse(id: string) {
    
    this.selectedCourse = this.courses.find(course => course.id === id);
  }

  onBack() {
    this.selectedCourse = null;
  }
}
