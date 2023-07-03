import { type ICustomRequest, type IUserRequest, Status } from '../dto'
import { type Request, type Response } from 'express'
import { User } from '../models'
import { createFilter, createUserInstanceService, createUserService, errorMessageHandler, getUserbyIdService } from '../services'
import { userRepository } from '../repositories'
import { getUserResponseFiltered } from '../services/user'

const createUser = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const { ...userRequest }: IUserRequest = req.body

    const role = req.role

    const userInstance = await createUserInstanceService(userRequest, role)
    await createUserService(userInstance)

    return res.status(201).json({
      message: 'Successfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in user create'))
  }
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)

    await userRepository.update(id, {
      status: Status.INACTIVE
    })

    return res.status(204).json({})
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in delete user by id'))
  }
}

const getAllUsers = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.filter
    if (reqFilter !== undefined) {
      const users = await createFilter(reqFilter, new User(), userRepository)
      return res.status(200).json(users)
    }

    const users = await userRepository.find({ relations: { role: true } })

    return res.status(200).json(getUserResponseFiltered(users))
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get all users'))
  }
}

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const user = await getUserbyIdService(id)

    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get user by id'))
  }
}

const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lastLogin, updatedOn, password, role, ...user }: User = req.user as User
    const { id } = role

    return res.status(200).json({
      ...user,
      roleId: id
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get user profile'))
  }
}

const updateUser = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const { roleId, password, ...userRequest }: IUserRequest = req.body
    const id = parseInt(req.params.id)

    const role = req.role

    await userRepository.update(id, {
      role,
      ...userRequest
    })

    return res.status(204).json({})
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in user update by id'))
  }
}

export {
  createUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUser
}
