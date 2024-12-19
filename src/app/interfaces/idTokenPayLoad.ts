export interface IdTokenPayload {
  roles?: string[]; // Rollen des Benutzers
  preferred_username?: string; // Benutzername (Keycloak-spezifisch)
  name?: string; // Vollständiger Name des Benutzers
  sub?: string; // Benutzer-ID
}
