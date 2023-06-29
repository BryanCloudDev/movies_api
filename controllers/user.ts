import { type Request, type Response } from 'express'
import { createUserInstanceService, createUserService, getUserbyIdService } from '../services/user'
import { type IUserRequest } from '../dto/user/IUserRequest'
import Roles from '../dto/enums/roles'
import { getRoleByIdService } from '../services/role'
import { userRepository } from '../repositories'

const getUserbyId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const user = await getUserbyIdService(id)

    return res.json(user)
  } catch (error: any) {
    return res.status(500).json({
      error: 'error in get user by id'
    })
  }
}

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ...userRequest }: IUserRequest = req.body
    const roleSent = userRequest.roleId ?? Roles.USER
    const role = await getRoleByIdService(roleSent)

    if (role === null) {
      return res.json({
        error: `role with id ${roleSent} not found`
      })
    }

    const userInstance = await createUserInstanceService(userRequest, role)
    const user = await createUserService(userInstance)

    return res.json(user)
  } catch (error: any) {
    return res.status(500).json({
      error: 'error in create user admin'
    })
  }
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleId, password, ...userRequest }: IUserRequest = req.body
    const id = parseInt(req.params.id)

    const role = await getRoleByIdService(roleId)

    if (role === null) {
      return res.json({
        error: `role with id ${roleId} not found`
      })
    }

    await userRepository.update(id, {
      role,
      ...userRequest
    })

    return res.status(204).json({})
  } catch (error: any) {
    return res.status(500).json({
      error: 'error in patch user'
    })
  }
}

export {
  getUserbyId,
  createUser,
  updateUser
}
