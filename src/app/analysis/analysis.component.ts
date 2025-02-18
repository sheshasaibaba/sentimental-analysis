import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export interface Sentiment {
  sentiment: string;
  score: number;
}
@Component({
  selector: 'app-analysis',
  standalone: true, 
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent {
  textForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  errorMessage = signal('');
  isLoading = signal(false);
  analysisResult: Sentiment | undefined;
  constructor(private apiService : ApiService) {
  }

  isLoadingOrNot() {
    return this.isLoading();
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
      this.isLoading.set(true);
      console.log('Form submitted:', this.textForm.value);
      const textToAnalyze = this.textForm.value.text;
      if (textToAnalyze) {
        this.apiService.sendTextToAnalyze(textToAnalyze).subscribe({
          next: (response) => {
            this.analysisResult = response
            this.isLoading.set(false);
          },
          error: (error) => {
            console.error('Error:', error);
            this.isLoading.set(false);

          },
        });
      } else {
        console.error('Text is null or undefined');
        this.isLoading.set(false);

      }
    }
  }

  getSentimentColor(sentiment: string): string {
    if (sentiment === 'POSITIVE') {
      return 'green';
    } else if (sentiment === 'NEGATIVE') {
      return 'red';
    } else {
      return 'gray';
    }
  }
  
}