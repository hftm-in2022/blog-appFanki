import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated = false;
  userName: string | null = null;
  userRoles: string[] | null = null;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
  ) {
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

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
