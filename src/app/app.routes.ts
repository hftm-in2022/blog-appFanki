import { Routes } from '@angular/router';
import { BlogDetailResolver } from './resolvers/blog-detail.resolver';

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
];
