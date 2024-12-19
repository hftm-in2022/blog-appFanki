export function hasRole(roles: string[] | undefined, role: string): boolean {
  return roles?.includes(role) ?? false;
}
