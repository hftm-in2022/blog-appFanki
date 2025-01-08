import { Routes } from '@angular/router';
import { BlogOverviewPageComponent } from './features/blog-overview-page/blog-overview-page.component';
import { BlogDetailsPageComponent } from './features/blog-details-page/blog-details-page.component';
import { AddBlogPageComponent } from './features/add-blog-page/add-blog-page.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { RegisterPageComponent } from './features/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogOverviewPageComponent,
  },
  {
    path: 'blog-details/:id',
    component: BlogDetailsPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'add-blog',
    component: AddBlogPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
