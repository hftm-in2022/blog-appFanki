import { Component, Input } from '@angular/core';
import { Blog } from '../../../interfaces/blog';
import { BlogItemComponent } from '../../blog-item/blog-item.component'; // BlogItemComponent importieren

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [BlogItemComponent], // BlogItemComponent hier in die Imports aufnehmen
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent {
  @Input() blogs: Blog[] = [];
}
