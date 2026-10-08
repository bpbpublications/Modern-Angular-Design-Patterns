import { AccessStrategy } from './access.strategy';

export class AdminAccessStrategy implements AccessStrategy {
  canActivate(role: string): boolean {
    return role === 'admin';
  }
}

export class ManagerApprovalAccessStrategy implements AccessStrategy {
  canActivate(role: string): boolean {
    return role === 'manager' || role === 'admin';
  }
}

export class EmployeeSelfServiceAccessStrategy implements AccessStrategy {
  canActivate(role: string): boolean {
    return role === 'employee' || role === 'manager' || role === 'admin';
  }
}
