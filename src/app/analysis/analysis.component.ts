import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-analysis',
  standalone: true, 
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {
  textForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  errorMessage = signal('');

  constructor() {
  }


  getErrorMessage(controlName: string): string {
    const control = this.textForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('minlength')) {
      return `Text must be at least ${control.errors?.['minlength'].requiredLength} characters long.`;
    }
    return '';
  }

  onSubmit() {
    if (this.textForm.valid) {
      console.log('Form submitted:', this.textForm.value);
    }
  }
}