import { Employee, Job } from '@prisma/client';

export type EmployeeWithJob = Employee & { job: Job }
