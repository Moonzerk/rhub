import { PrismaClient } from '@prisma/client';
import superjson from 'superjson';
import { EmployeeWithJob } from '../../type';

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const employees: EmployeeWithJob[] = await prisma.employee.findMany({
    include: { job: true }
  })

  return superjson.stringify(employees) as unknown as typeof employees
})
