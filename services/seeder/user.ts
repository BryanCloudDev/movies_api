import { faker } from '@faker-js/faker'
import { createUserInstanceService } from '../user'
import moment from 'moment'
import { type Role, type User } from '../../models'
import { userRepository } from '../../repositories'

export class UserFactory {
  constructor (
    private readonly role: Role
  ) {}

  async createDummyUser (): Promise<User> {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const password = faker.internet.password()
    let email: string
    const birthDate = moment(faker.date.birthdate()).toISOString()
    const profilePhoto = faker.image.avatar()
    const roleId = this.role.id

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
    }, this.role)

    return userInstance
  }

  // createMultipleDummyUsers (count: number): User[] {
  //   const users: User[] = []
  //   for (let i = 0; i < count; i++) {
  //     const user = this.createDummyUser()
  //     users.push(user)
  //   }
  //   return users
  // }
}
