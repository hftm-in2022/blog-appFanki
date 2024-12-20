import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss'],
})
export class AddBlogPageComponent {
  blogForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.isSubmitting = true;
      console.log('Blog:', this.blogForm.value);

      // Simulierte Backend-Speicherung
      setTimeout(() => {
        this.isSubmitting = false;
        this.blogForm.reset();
      }, 2000);
    }
  }

  onReset(): void {
    this.blogForm.reset();
  }

  goBackToBlogs(): void {
    this.router.navigate(['/']); // Zur Blog-Übersichtsseite navigieren
  }
}
