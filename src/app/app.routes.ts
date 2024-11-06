import { Routes } from '@angular/router';

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
  },
];
