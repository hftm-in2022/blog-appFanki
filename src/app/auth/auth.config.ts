export const authConfig = {
  authority:
    'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: 'spa-blog',
  scope: 'openid profile email offline_access blogs', // Füge die benötigten Scopes hinzu
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true, // Verwende Refresh Tokens
  silentRenewUrl: `${window.location.origin}/silent-renew.html`,
  renewTimeBeforeTokenExpiresInSeconds: 10,
  secureRoutes: [`${window.location.origin}/api`], // Sichere Routen definieren
};
