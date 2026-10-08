export interface AccessStrategy {
  canActivate(role: string): boolean;
}
