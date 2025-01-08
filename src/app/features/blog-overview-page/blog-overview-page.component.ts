import { Component, OnInit } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { BlogService } from '../../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    BlogListComponent,
  ],
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
})
export class BlogOverviewPageComponent implements OnInit {
  blogs: Blog[] = []; // Gesamte Blog-Liste
  displayedBlogs: Blog[] = []; // Aktuell angezeigte Blogs
  currentIndex = 0;
  maxBlogs = 9; // Zeige bis zu 9 Blogs pro Ladung an
  isLoading = true;
  title = 'BlogApp';

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  // Lädt Blogs aus der API
  private loadBlogs(): void {
    this.blogService.getBlogs().subscribe(
      (response: Blog[]) => {
        console.log('Blogs loaded:', response);
        this.blogs = response;
        this.updateDisplayedBlogs();
        this.isLoading = false;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Blogs:', error);
        this.isLoading = false;
      },
    );
  }

  // Aktualisiert die angezeigten Blogs basierend auf der aktuellen Seite
  updateDisplayedBlogs(): void {
    const nextBlogs = this.blogs.slice(
      this.currentIndex,
      this.currentIndex + this.maxBlogs,
    );
    this.displayedBlogs = [...this.displayedBlogs, ...nextBlogs]; // Neue Blogs zur angezeigten Liste hinzufügen
  }

  // Lädt mehr Blogs
  loadMoreBlogs(): void {
    this.currentIndex += this.maxBlogs;
    this.updateDisplayedBlogs();
  }

  // Navigiert zur Detailseite eines Blogs
  navigateToDetails(blogId: number): void {
    this.router.navigate(['/blog-details', blogId]);
  }

  // Liked einen Blog
  onLike(blog: Blog): void {
    if (!blog.likedByMe) {
      blog.likes++;
      blog.likedByMe = true;

      this.blogService.updateBlog({ ...blog }).subscribe(
        () => console.log(`Blog ${blog.id} erfolgreich geliked!`),
        (error) => console.error('Fehler beim Liken des Blogs:', error),
      );
    } else {
      console.log(`Blog ${blog.id} wurde bereits geliked.`);
    }
  }

  // Teilt einen Blog-Link
  onShare(blog: Blog): void {
    const shareUrl = `${window.location.origin}/blog-details/${blog.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link zum Blog wurde kopiert!');
    });
  }
}
