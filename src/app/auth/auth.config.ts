import { provideAuth } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const authProviders = [
  provideAuth({
    config: {
      authority:
        'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'spa-blog',
      scope: 'openid profile email offline_access blogs', // Füge die benötigten Scopes hinzu
      responseType: 'code',
      silentRenew: true,
      silentRenewUrl: window.location.origin + '/silent-renew.html',
      renewTimeBeforeTokenExpiresInSeconds: 10,
      secureRoutes: [environment.serviceUrl], // Sichere Routen definieren
    },
  }),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
