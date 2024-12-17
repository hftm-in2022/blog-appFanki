export interface IdTokenPayload {
  roles?: string[]; // Rollen des Benutzers
  preferred_username?: string; // Benutzername
  sub?: string; // Benutzer-ID
}
