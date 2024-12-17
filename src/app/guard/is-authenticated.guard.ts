import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../helpers/has-role.helper';
import { map } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);

  return oidcSecurityService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) return false; // Benutzer nicht eingeloggt

      // Extrahiere Rollen aus dem Token
      const payload = oidcSecurityService.getPayloadFromIdToken() as {
        roles?: string[];
      };

      // Prüfe, ob der Benutzer die Rolle 'user' hat
      return hasRole(payload?.roles, 'user');
    }),
  );
};
