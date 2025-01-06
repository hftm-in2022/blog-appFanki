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

  onLike(blog: Blog): void {
    if (!blog.likedByMe) {
      blog.likes += 1; // Erhöhe die Likes, wenn der Benutzer noch nicht geliked hat.
      blog.likedByMe = true; // Markiere, dass der Benutzer den Blog geliked hat.

      console.log(`Blog ${blog.id} geliked!`);

      // API-Aufruf zur Aktualisierung des Likes
      this.blogService
        .updateLikeInfo(blog.id, {
          likes: blog.likes,
          likedByMe: blog.likedByMe,
        })
        .subscribe(
          () => console.log('Like erfolgreich aktualisiert!'),
          (error) =>
            console.error('Fehler beim Aktualisieren des Likes:', error),
        );
    } else {
      console.log(`Blog ${blog.id} wurde bereits geliked.`);
    }
  }

  onShare(blog: Blog): void {
    const shareUrl = `${window.location.origin}/blog-details/${blog.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link zum Blog wurde kopiert!');
    });
  }
}
