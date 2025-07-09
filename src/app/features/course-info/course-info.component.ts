import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() id!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];

  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
