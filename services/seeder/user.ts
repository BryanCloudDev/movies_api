
import { createUserInstanceService } from '../user'
import moment from 'moment'
import { type Role, type User } from '../../models'
import { roleRepository, userRepository } from '../../repositories'
import { faker } from '@faker-js/faker'
import { getRoleByIdService } from '../role'
import { Roles } from '../../dto'

const createDummyUser = async (role: Role): Promise<User> => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const password = faker.internet.password()
  let email: string
  const birthDate = moment(faker.date.birthdate()).toISOString()
  const profilePhoto = faker.image.avatar()

  const roleId = role.id

  let emailNotUsed = false

  do {
    email = faker.internet.email()

    const foundEmail = await userRepository.findOne({ where: { email } })
    if (foundEmail === null) {
      emailNotUsed = true
    }
  } while (!emailNotUsed)

  const userInstance = await createUserInstanceService({
    firstName, lastName, email, password, birthDate, profilePhoto, roleId
  }, role)

  return userInstance
}

const createMultipleDummyUsers = async (count: number, roleId: number): Promise<undefined> => {
  const role = await getRoleByIdService(roleId)

  if (role === null) {
    return
  }

  const userPromises: Array<Promise<User>> = []

  for (let i = 0; i < count; i++) {
    const user = await createDummyUser(role)
    userPromises.push(userRepository.save(user))
  }

  await Promise.all(userPromises)
  await createInitialAdminUser()
}

const createInitialAdminUser = async (): Promise<undefined> => {
  const role = await roleRepository.findOne({ where: { id: Roles.ADMIN } })

  if (role === null) {
    return
  }

  const userInstance = await createUserInstanceService({
    firstName: 'User',
    lastName: 'Admin',
    birthDate: moment().toISOString(),
    email: 'example@example.com',
    password: 'secretpassword',
    profilePhoto: faker.image.avatar(),
    roleId: Roles.ADMIN
  }, role)

  await userRepository.save(userInstance)
}

export {
  createDummyUser,
  createMultipleDummyUsers
}
