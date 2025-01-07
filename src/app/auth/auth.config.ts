import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { environment } from '../../environments/environment';

export const authConfig = {
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
};

export const authProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
