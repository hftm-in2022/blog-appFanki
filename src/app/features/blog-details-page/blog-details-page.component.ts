import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { StateStore } from '../../state/state-store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailsPageComponent {
  store = inject(StateStore);
  blogId = inject(ActivatedRoute).snapshot.params['id'];
  blog = this.store.blogs().find((b) => b.id === this.blogId); // Blog aus zentralem State abrufen
}
