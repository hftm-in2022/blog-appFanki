import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Blog } from '../../../interfaces/blog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush Change Detection
})
export class BlogListComponent {
  @Input() blogs: Blog[] = []; // Blogs als Input von der übergeordneten Komponente
  @Input() navigateToDetails!: (blogId: number) => void; // Funktion für Navigation
  @Input() onLike!: (blog: Blog) => void; // Funktion für Likes
  @Input() onShare!: (blog: Blog) => void; // Funktion für Teilen
}
