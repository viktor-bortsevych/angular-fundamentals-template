import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { v4 as uuidv4 } from 'uuid';

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  availableAuthors: Author[] = [];
  courseAuthors: Author[] = [];
  submitted = false;
  
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  
  ngOnInit() {
    // Initialize the form
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        author: ['', [Validators.pattern(/^[a-zA-Z0-9\s]+$/), Validators.minLength(2)]]
      }),
      duration: [0, [Validators.required, Validators.min(0)]]
    });
    
    // Use mockedAuthorsList instead of hardcoded values
    this.availableAuthors = mockedAuthorsList;
  }
  
  // Helper getters for form controls
  get title() { return this.courseForm.controls['title']; }
  get description() { return this.courseForm.controls['description']; }
  get duration() { return this.courseForm.controls['duration']; }
  get authorsList() { return this.courseForm.controls['authors'] as FormArray; }
  get newAuthorControl() { return (this.courseForm.controls['newAuthor'] as FormGroup).controls['author']; }
  
  // Author management methods
  addAuthorToCourse(author: Author): void {
    this.availableAuthors = this.availableAuthors.filter(a => a.id !== author.id);
    this.courseAuthors.push(author);
    this.authorsList.push(this.fb.control({ id: author.id, name: author.name }));
  }
  
  removeAuthorFromCourse(index: number): void {
    const author = this.courseAuthors[index];
    this.courseAuthors.splice(index, 1);
    this.availableAuthors.push(author);
    this.authorsList.removeAt(index);
  }
  
  createAuthor(): void {
    if (this.newAuthorControl && this.newAuthorControl.valid && this.newAuthorControl.value) {
      const newAuthor: Author = {
        id: uuidv4(),
        name: this.newAuthorControl.value
      };
      
      this.availableAuthors.push(newAuthor);
      this.newAuthorControl.setValue('');
      this.newAuthorControl.markAsUntouched();
    }
  }

  deleteAuthor(authorId: string): void {
    // Remove the author from available authors list
    this.availableAuthors = this.availableAuthors.filter(author => author.id !== authorId);
    
    // Also check if the author is in course authors list and remove if present
    const courseAuthorIndex = this.courseAuthors.findIndex(author => author.id === authorId);
    if (courseAuthorIndex !== -1) {
      this.courseAuthors.splice(courseAuthorIndex, 1);
      this.authorsList.removeAt(courseAuthorIndex);
    }
    
    console.log('Author deleted:', authorId);
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.courseForm.valid) {
      console.log('Form submitted:', {
        title: this.title.value,
        description: this.description.value,
        duration: this.duration.value,
        authors: this.courseAuthors
      });
    } else {
      this.markFormGroupTouched(this.courseForm);
    }
  }
  
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        const formArray = control as FormArray;
        for (let i = 0; i < formArray.length; i++) {
          const control = formArray.at(i);
          if (control instanceof FormGroup) {
            this.markFormGroupTouched(control as FormGroup);
          } else {
            control.markAsTouched();
          }
        }
      }
    });
  }
}