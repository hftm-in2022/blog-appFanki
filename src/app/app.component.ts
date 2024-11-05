import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DemoComponent } from './demo/demo.component';
import { BlogService } from './services/blog.service';
import { Blog } from './interfaces/blog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DemoComponent,
    CommonModule,
    HttpClientModule,
    FormsModule, // Add FormsModule for ngModel support
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blog-app';
  blogs: Blog[] = [];
  displayedBlogs: Blog[] = [];
  currentIndex = 0;
  maxBlogs = 3;
  isLoading = true;
  selectedBlog: Blog | null = null;
  isCreatingNewBlog = false;
  isEditingBlog = false;
  newBlog: Blog = {
    id: 0,
    title: '',
    author: '',
    contentPreview: '',
    likes: 0,
    comments: 0,
    headerImageUrl: '',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    likedByMe: false,
    createdByMe: true,
  };

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.data;
        this.updateDisplayedBlogs();
        this.isLoading = false;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Blogs:', error);
        this.isLoading = false;
      },
    );
  }

  updateDisplayedBlogs(): void {
    this.displayedBlogs = this.blogs.slice(
      this.currentIndex,
      this.currentIndex + this.maxBlogs,
    );
  }

  prevBlog(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateDisplayedBlogs();
    }
  }

  nextBlog(): void {
    if (this.currentIndex + this.maxBlogs < this.blogs.length) {
      this.currentIndex++;
      this.updateDisplayedBlogs();
    }
  }

  viewDetails(blogId: number): void {
    this.selectedBlog = this.blogs.find((blog) => blog.id === blogId) || null;
    this.isEditingBlog = false;
  }

  closeDetails(): void {
    this.selectedBlog = null;
    this.isEditingBlog = false;
  }

  toggleLike(blog: Blog): void {
    blog.likes += blog.likedByMe ? -1 : 1;
    blog.likedByMe = !blog.likedByMe;
    this.blogService
      .updateLikeInfo(blog.id, { likedByMe: blog.likedByMe })
      .subscribe();
  }

  startCreatingNewBlog(): void {
    this.isCreatingNewBlog = true;
    this.selectedBlog = null;
  }

  saveNewBlog(): void {
    this.blogs.push({ ...this.newBlog, id: this.blogs.length + 1 });
    this.isCreatingNewBlog = false;
    this.newBlog = {
      id: 0,
      title: '',
      author: '',
      contentPreview: '',
      likes: 0,
      comments: 0,
      headerImageUrl: '',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      likedByMe: false,
      createdByMe: true,
    };
    this.updateDisplayedBlogs();
  }

  startEditingBlog(): void {
    this.isEditingBlog = true;
  }

  saveEditedBlog(): void {
    if (this.selectedBlog) {
      const index = this.blogs.findIndex(
        (blog) => blog.id === this.selectedBlog!.id,
      );
      if (index !== -1) {
        this.blogs[index] = this.selectedBlog;
        this.isEditingBlog = false;
      }
    }
  }
}
