import { Routes } from '@angular/router';
import { BlogDetailResolver } from './resolvers/blog-detail.resolver';
import { isAuthenticatedGuard } from './guard/is-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/blog-overview-page/blog-overview.module').then(
        (m) => m.BlogOverviewModule,
      ),
  },
  {
    path: 'blog-details/:id',
    loadChildren: () =>
      import('./features/blog-details-page/blog-details.module').then(
        (m) => m.BlogDetailsModule,
      ),
    resolve: {
      blog: BlogDetailResolver, // BlogDetailResolver zum Laden der Blog-Daten vor dem Navigieren
    },
  },
  {
    path: 'add-blog',
    loadChildren: () =>
      import('./features/add-blog-page/add-blog-page.module').then(
        (m) => m.AddBlogPageModule,
      ),
    canActivate: [isAuthenticatedGuard], // Guard hinzufügen
  },
];
