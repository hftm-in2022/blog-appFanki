import { Routes } from '@angular/router';
import { BlogOverviewPageComponent } from './features/blog-overview-page/blog-overview-page.component';
import { BlogDetailsPageComponent } from './features/blog-details-page/blog-details-page.component';

export const routes: Routes = [
  { path: '', component: BlogOverviewPageComponent },
  { path: 'blog-details/:id', component: BlogDetailsPageComponent },
];
