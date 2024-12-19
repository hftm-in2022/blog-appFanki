import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  username = '';
  password = '';
  loginError: string | null = null;

  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.loginError = 'Bitte Benutzername und Passwort eingeben.';
      return;
    }

    this.oidcSecurityService.authorize(); // Weiterleitung zu Keycloak

    this.oidcSecurityService.checkAuth().subscribe({
      next: ({ isAuthenticated }) => {
        if (isAuthenticated) {
          this.router.navigate(['/']); // Weiterleitung zur Blog-Seite bei Erfolg
        } else {
          this.loginError =
            'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
        }
      },
      error: (err) => {
        console.error('Login-Fehler:', err);
        this.loginError =
          'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
      },
    });
  }

  navigateToBlogs(): void {
    this.router.navigate(['/']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
