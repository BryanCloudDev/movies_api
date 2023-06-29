import { type Request, type Response } from 'express'
import { createUserInstanceService, createUserService, getUserbyIdService } from '../services/user'
import { type IUserRequest } from '../dto/user/IUserRequest'

const getUserbyId = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id)
    const user = getUserbyIdService(id)
    res.json(user)
  } catch (error: any) {
    res.status(500).json({
      error: 'error in get user by id'
    })
  }
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ...userRequest }: IUserRequest = req.body
    const roleSent = userRequest.roleId ?? 1
    const userInstance = await createUserInstanceService(userRequest, roleSent)
    const user = await createUserService(userInstance)

    res.json(user)
  } catch (error: any) {
    res.status(500).json({
      error: 'error in get user by id'
    })
  }
}

export {
  getUserbyId,
  createUser
}
