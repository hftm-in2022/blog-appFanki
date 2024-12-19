import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

interface IdTokenPayload {
  roles?: string[];
}

export const isAuthenticatedGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  return oidcSecurityService.isAuthenticated$.pipe(
    map(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        console.warn('User is not authenticated');
        return false;
      }
      try {
        const payload =
          oidcSecurityService.getPayloadFromIdToken() as IdTokenPayload | null;
        const hasUserRole = payload?.roles?.includes('user') ?? false;
        if (!hasUserRole) {
          console.warn('User does not have the required role: user');
        }
        return hasUserRole;
      } catch (error) {
        console.error('Error in isAuthenticatedGuard:', error);
        return false;
      }
    }),
  );
};
