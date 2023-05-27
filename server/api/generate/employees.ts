import { randAddress, randBetweenDate, randEmail, randFirstName, randLastName, randNumber, randPhoneNumber, randUuid } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { draw, list } from 'radash';

const prisma = new PrismaClient()

function randEmployee(jobs: string[]) {
  const genders = ['W', 'M']
  const firstname = randFirstName()
  const lastname = randLastName()

  const years = randNumber({ min: 20, max: 60 })
  const from = DateTime.now().minus({ years }).startOf('year').toJSDate()
  const to = DateTime.now().minus({ years }).endOf('year').toJSDate()

  const date = randBetweenDate({ from, to })

  const seniority = (() => {
    let n = randNumber({ min: 0, max: 30 })

    while (years - n < 20) {
      n = randNumber({ min: 0, max: 30 })
    }

    return n
  })()

  const address = randAddress();

  return {
    id: randUuid(),
    email: randEmail({
      firstName: firstname,
      lastName: lastname,
      provider: 'gmail'
    }),
    firstname,
    lastname,
    gender: draw(genders),
    birth_date: date,
    arrival_date: randBetweenDate({
      from: DateTime.now().minus({ years: seniority }).startOf('year').toJSDate(),
      to: DateTime.now().minus({ years: seniority }).endOf('year').toJSDate()
    }),
    departure_date: null,
    phone: randPhoneNumber({ countryCode: 'FR' }),
    city: address.city,
    address: address.street,
    job_id: draw(jobs) as string,
  }
}


export default defineEventHandler(async (event) => {
  const jobs = (await prisma.job.findMany()).map(j => j.id)

  const employees = list(50).map(() => randEmployee(jobs))
  await prisma.employee.createMany({ data: employees })

  return await prisma.employee.findMany()
})
