import { Component, OnInit } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { BlogService } from '../../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule, DatePipe],
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
})
export class BlogOverviewPageComponent implements OnInit {
  blogs: Blog[] = [];
  blogRows: Blog[][] = [];
  currentIndex = 0;
  maxBlogs = 9; // Zeige bis zu 9 Blogs pro Ladung an
  blogsPerRow = 3;
  isLoading = true;
  title = 'BlogApp';

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

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
    const displayed = this.blogs.slice(0, this.currentIndex + this.maxBlogs);
    this.blogRows = [];
    for (let i = 0; i < displayed.length; i += this.blogsPerRow) {
      this.blogRows.push(displayed.slice(i, i + this.blogsPerRow));
    }
  }

  loadMoreBlogs(): void {
    this.currentIndex += this.maxBlogs;
    this.updateDisplayedBlogs();
  }

  navigateToDetails(blogId: number): void {
    this.router.navigate(['/blog-details', blogId]);
  }
}
