import { type Request, type Response } from 'express'
import type IMovieRequest from '../dto/movie/IMovieRequest'
import { createMovieInstanceService, createMovieService, getLikeCountService } from '../services/movie'
import { movieRepository } from '../repositories'
import { Status } from '../dto/enums/status'
import { Movie, type User } from '../models'
import { createLikedMovieInstanceService, createLikedMovieService } from '../services/likedMovie'
import type ICustomRequest from '../dto/request/ICustomRequest'
import createFilter from '../services/createFilter'
import errorMessageHandler from '../services/errorMessage'

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movieRequest: IMovieRequest = req.body

    const movieInstance = await createMovieInstanceService(movieRequest)
    await createMovieService(movieInstance)

    return res.status(201).json({
      message: 'Succesfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in create movie'))
  }
}

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movieRequest: IMovieRequest = req.body
    const id = parseInt(req.params.id)

    await movieRepository.update(id, { ...movieRequest })

    return res.status(204).json({})
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in movie update'))
  }
}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)

    await movieRepository.update(id, {
      status: Status.INACTIVE
    })

    return res.status(204).json({})
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in delete movie'))
  }
}

const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.query.filter as string
    if (reqFilter !== undefined) {
      const movies = await createFilter(reqFilter, new Movie(), movieRepository)
      return res.status(200).json(movies)
    }

    const movies = await movieRepository.find()

    return res.status(200).json(movies)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get all movies'))
  }
}

const likeAMovie = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user as User
    const movie = req.movie

    const likedMovieInstance = createLikedMovieInstanceService(movie, user)

    await createLikedMovieService(likedMovieInstance)

    return res.status(201).json({
      message: 'Successfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in like movie'))
  }
}

const getLikeCountForMovies = async (res: Response): Promise<Response> => {
  try {
    const movies = await movieRepository.find({ relations: { likes: true } })

    return res.status(200).json(getLikeCountService(movies))
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get likes count'))
  }
}

export {
  createMovie,
  deleteMovie,
  getAllMovies,
  getLikeCountForMovies,
  likeAMovie,
  updateMovie
}
