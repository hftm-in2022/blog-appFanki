import { Routes } from '@angular/router';
import { BlogDetailsPageComponent } from './blog-details-page.component';
import { BlogDetailResolver } from '../../resolvers/blog-detail.resolver';

export const BLOG_DETAILS_PAGE_ROUTES: Routes = [
  {
    path: 'blog-details/:id',
    component: BlogDetailsPageComponent,
    resolve: { blog: BlogDetailResolver }, // Resolver hier hinzufügen
  },
];
