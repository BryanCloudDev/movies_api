import { type Request, type Response } from 'express'
import { createUserInstanceService, createUserService, getUserbyIdService } from '../services/user'
import { type IUserRequest } from '../dto/user/IUserRequest'
import Roles from '../dto/enums/roles'
import { getRoleByIdService } from '../services/role'
import { likedMoviesRepository, userRepository } from '../repositories'
import { Status } from '../dto/enums/status'
import { type User } from '../models'

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

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userRepository.find()

    return res.json(users)
  } catch (error: any) {
    return res.status(500).json({
      error: 'error in get all users'
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
    await createUserService(userInstance)

    return res.json({
      message: 'Successfully created'
    })
  } catch (error: any) {
    console.log(error.message)

    return res.status(500).json({
      error: 'error in create user'
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

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)

    await userRepository.update(id, {
      status: Status.INACTIVE
    })

    return res.status(204).json()
  } catch (error: any) {
    return res.status(500).json({
      error: 'error in delete user'
    })
  }
}

const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
  const { lastLogin, updatedOn, password, role, ...user }: User = req.user as User
  const { id } = role
  return res.json({
    ...user,
    roleId: id
  })
}

const getMoviesLikedByUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const movies = await likedMoviesRepository.find({ where: { user: { id } }, relations: { movie: true } })

    return res.json(movies)
  } catch (error) {
    return res.status(500).json({
      message: 'error in get movies liked by user'
    })
  }
}

export {
  createUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  getMoviesLikedByUser,
  getUserbyId,
  updateUser
}
