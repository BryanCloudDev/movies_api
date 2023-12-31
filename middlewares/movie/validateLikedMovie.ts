import { type ICustomRequest } from '../../dto'
import { type NextFunction, type Response } from 'express'
import { type User } from '../../models'
import { errorMessageHandler } from '../../services'
import { likedMoviesRepository } from '../../repositories'

const validateLikedMovieonCreate = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const user = req.user as User
    const movieId = parseInt(req.body.id)

    const likedMovie = await likedMoviesRepository.findOne({ where: { movie: { id: movieId }, user: { id: user.id } } })

    if (likedMovie !== null) {
      return res.status(404).json({
        message: `The movie with the id ${movieId} has received a like already`
      })
    }

    next()
  } catch (error: any) {
    errorMessageHandler(error, 'Error in like a movie validation')
  }
}

const validateLikedMovieonDelete = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const user = req.user as User
  const movieId = parseInt(req.params.id)

  const likedMovie = await likedMoviesRepository.findOne({ where: { movie: { id: movieId }, user: { id: user.id } } })

  if (likedMovie === null) {
    return res.status(404).json({
      message: `The movie with the id ${movieId} has not received a like from you`
    })
  }

  req.like = likedMovie

  next()
}

export {
  validateLikedMovieonCreate,
  validateLikedMovieonDelete
}
