import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { StateStore } from '../../state/state-store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailsPageComponent implements OnInit {
  store = inject(StateStore);
  route = inject(ActivatedRoute);

  blogId: number | null = null;
  blog: Blog | undefined;

  ngOnInit(): void {
    // Hole die Blog-ID aus den Routen-Parametern
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.blogId = +idParam; // Konvertiere die ID in eine Zahl
    } else {
      console.error('Blog ID not found in route parameters');
    }

    // Hole das Blog basierend auf der ID aus dem State-Store
    if (this.blogId) {
      this.blog = this.store.blogs().find((b) => b.id === this.blogId);
      if (!this.blog) {
        console.error(`Blog with ID ${this.blogId} not found in state`);
      }
    }
  }
}
