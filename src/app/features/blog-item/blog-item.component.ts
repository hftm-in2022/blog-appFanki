import {
  Component,
  WritableSignal,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush Change Detection
  exportAs: 'appBlogItem',
})
export class BlogItemComponent {
  blog: WritableSignal<Blog> = signal({} as Blog); // Signal für Blog-Daten
  isDetailView: WritableSignal<boolean> = signal(false); // Signal für die Detailansicht

  // Setter für die Blog-Daten
  setBlog(blogData: Blog): void {
    this.blog.set(blogData); // Aktualisiert den Blog
  }

  // Setter für die Detailansicht
  setIsDetailView(isDetail: boolean): void {
    this.isDetailView.set(isDetail); // Aktualisiert die Detailansicht
  }
}
