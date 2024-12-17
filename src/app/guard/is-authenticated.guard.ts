import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { IdTokenPayload } from '../interfaces/idTokenPayLoad'; // Pfad zum Interface anpassen

export const isAuthenticatedGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);

  return oidcSecurityService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) return false; // Nicht eingeloggt

      // Payload sicher casten
      const payload =
        oidcSecurityService.getPayloadFromIdToken() as IdTokenPayload | null;

      // Prüfen, ob die Rolle 'user' vorhanden ist
      return !!payload?.roles?.includes('user');
    }),
  );
};
