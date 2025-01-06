import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Blog } from '../../../interfaces/blog';
import { BlogItemComponent } from '../../blog-item/blog-item.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [BlogItemComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush Change Detection
})
export class BlogListComponent {
  @Input() blogs: Blog[] = []; // Blogs als Input von der übergeordneten Komponente
}
