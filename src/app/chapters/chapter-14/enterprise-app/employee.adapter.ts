import { Employee } from './employee.model';

interface EmployeeApi {
  emp_id?: string;
  full_name?: string;
  job_title?: string;
  start_date?: string | null;
}

export class EmployeeAdapter {
  adapt(api: EmployeeApi): Employee {
    const joinedOn = api.start_date ? new Date(api.start_date) : null;

    return {
      id: api.emp_id ?? '',
      name: api.full_name ?? 'Unknown',
      role: api.job_title ?? 'Unassigned',
      joinedOn: joinedOn && !isNaN(joinedOn.getTime()) ? joinedOn : null
    };
  }
}
