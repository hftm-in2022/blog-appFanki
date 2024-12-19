import { Routes } from '@angular/router';
import { BlogDetailResolver } from './resolvers/blog-detail.resolver';
import { isAuthenticatedGuard } from './guard/is-authenticated.guard';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { BlogOverviewPageComponent } from './features/blog-overview-page/blog-overview-page.component';
import { RegisterPageComponent } from './features/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogOverviewPageComponent, // Blog-Seite als Startseite
  },
  {
    path: 'login',
    component: LoginPageComponent, // Login-Seite
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
  {
    path: 'register',
    component: RegisterPageComponent, // Registrierungs-Seite
  },
  {
    path: '**',
    redirectTo: '', // Weiterleitung zu Blog-Seite bei ungültigen Routen
  },
];
