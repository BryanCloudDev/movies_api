export interface IUserResponse {
  id: number
  createdOn: Date
  updatedOn: Date
  firstName: string
  lastName: string
  email: string
  birthDate: Date
  roleId: number
  status: number
  lastLogin: Date | null
  profilePhoto: string
}
