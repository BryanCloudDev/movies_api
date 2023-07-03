import { type Response, type NextFunction } from 'express'
import type ICustomRequest from '../dto/request/ICustomRequest'
import { type User } from '../models'
import { likedMoviesRepository } from '../repositories'

const validateLikedMovieonCreate = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {

}

const validateLikedMovieonDelete = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const user = req.user as User
  const movieId = parseInt(req.params.id)

  const likedMovie = await likedMoviesRepository.findOne({ where: { movie: { id: movieId }, user: { id: user.id } } })

  if (likedMovie === null) {
    return res.status(404).json({
      message: `The movie with he id ${movieId} has not received a like from you`
    })
  }

  req.like = likedMovie

  next()
}

export {
  validateLikedMovieonDelete,
  validateLikedMovieonCreate
}
