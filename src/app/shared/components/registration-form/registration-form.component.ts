import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @ViewChild('registrationForm') registrationForm!: NgForm;

  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Name:', this.name, 'Email:', this.email, 'Password:', this.password);
    }
  }
}
