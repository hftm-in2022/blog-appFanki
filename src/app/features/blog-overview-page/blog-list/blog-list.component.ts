import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Blog } from '../../../interfaces/blog';
import { BlogItemComponent } from '../../blog-item/blog-item.component';
import { StateStore } from '../../../state/state-store'; // Importiere den zentralen StateStore

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [BlogItemComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush Change Detection
})
export class BlogListComponent {
  store = inject(StateStore); // State-Store direkt verwenden
  blogs = this.store.blogs; // Blogs aus dem zentralen Signal

  // Optional: Methode zum Hinzufügen neuer Blogs (für zukünftige Funktionen)
  addBlog(newBlog: Blog): void {
    this.store.addBlog(newBlog);
  }
}
