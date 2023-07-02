import { type Request, type Response } from 'express'
import { createUserInstanceService, createUserService, getUserbyIdService } from '../services/user'
import type IUserRequest from '../dto/user/IUserRequest'
import { likedMoviesRepository, userRepository } from '../repositories'
import { Status } from '../dto/enums/status'
import { User } from '../models'
import createFilter from '../services/createFilter'
import type IUserResponse from '../dto/user/IUSerResponse'
import errorMessageHandler from '../services/errorMessage'
import type ICustomRequest from '../dto/request/ICustomRequest'

const getUserbyId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const user = await getUserbyIdService(id)

    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get user by id'))
  }
}

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.query.filter as string
    if (reqFilter !== undefined) {
      const users = await createFilter(reqFilter, new User(), userRepository)
      return res.status(200).json(users)
    }

    const users = await userRepository.find({ relations: { role: true } })

    const usersFiltered = users.map(user => {
      const { password, role, ...userResponse } = user

      const result: IUserResponse = {
        ...userResponse,
        roleId: role.id
      }

      return result
    })
    return res.json(usersFiltered)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get all users'))
  }
}

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

const getMoviesLikedByUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const movies = await likedMoviesRepository.find({ where: { user: { id } }, relations: { movie: true } })

    return res.status(200).json(movies)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get movies liked by user'))
  }
}

export {
  createUser,
  deleteUser,
  getAllUsers,
  getMoviesLikedByUser,
  getUserProfile,
  getUserbyId,
  updateUser
}
