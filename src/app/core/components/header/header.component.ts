import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated = false; // Authentifizierungsstatus
  userName: string | null = null; // Benutzername
  userRoles: string[] | null = null; // Benutzerrollen

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
  ) {
    // Authentifizierungsstatus abonnieren
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        console.log('Authentifizierungsstatus:', isAuthenticated);
        this.isAuthenticated = isAuthenticated;

        const payload = this.oidcSecurityService.getPayloadFromIdToken() as {
          roles?: string[];
          preferred_username?: string;
          name?: string;
        };

        this.userRoles = payload?.roles || [];
        this.userName = payload?.preferred_username || payload?.name || null;
      },
    );
  }

  // Login-Funktion
  login(): void {
    this.router.navigate(['/login']);
  }

  // Logout-Funktion
  logout(): void {
    this.oidcSecurityService.logoff();
  }

  // Login-Funktion
  addBlog(): void {
    this.router.navigate(['/add-blog']);
  }
}
