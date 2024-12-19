import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority:
      'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'student@hftm.ch',
    scope: 'openid profile email', // 'openid profile ' + your scopes
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: window.location.origin + '/silent-renew.html',
    renewTimeBeforeTokenExpiresInSeconds: 10,
  },
};
