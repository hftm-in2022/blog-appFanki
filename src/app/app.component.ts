import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Füge HttpClientModule hinzu
import { DemoComponent } from './demo/demo.component';
import { BlogService } from './services/blog.service';
import { Blog } from './interfaces/blog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemoComponent, CommonModule, HttpClientModule], // Achte darauf, dass HttpClientModule hier im imports-Array enthalten ist
  template: `
    <h1>{{ title }}</h1>
    <app-demo></app-demo>
    <router-outlet></router-outlet>

    <div class="blog-container">
      <div *ngFor="let blog of blogs" class="blog-item">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.contentPreview }}</p>
        <p>Autor: {{ blog.author }}</p>
        <p>Likes: {{ blog.likes }}</p>
        <p>Kommentare: {{ blog.comments }}</p>
        <img
          [src]="blog.headerImageUrl"
          alt="Header Image"
          *ngIf="blog.headerImageUrl"
        />
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blog-app';
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.data;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Blogs:', error);
      },
    );
  }
}
