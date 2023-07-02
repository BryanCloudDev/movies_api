import { type Request, type Response } from 'express'
import { type IMovieRequest } from '../dto/movie/IMovieRequest'
import { createMovieInstanceService, createMovieService, getLikeCountService } from '../services/movie'
import { movieRepository } from '../repositories'
import { Status } from '../dto/enums/status'
import { Movie, type User } from '../models'
import { createLikedMovieInstanceService, createLikedMovieService } from '../services/likedMovie'
import { type ICustomRequest } from '../dto/request/ICustomRequest'
import createFilter from '../services/createFilter'

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ...movieRequest }: IMovieRequest = req.body

    const movieInstance = await createMovieInstanceService(movieRequest)
    await createMovieService(movieInstance)

    return res.status(201).json({
      error: 'Succesfully created'
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: 'error in create movie'
    })
  }
}

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ...movieRequest }: IMovieRequest = req.body
    const id = parseInt(req.params.id)

    await movieRepository.update(id, { ...movieRequest })

    return res.status(204).json({})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: 'error in update movie'
    })
  }
}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)

    await movieRepository.update(id, {
      status: Status.INACTIVE
    })

    return res.status(204).json()
  } catch (error: any) {
    return res.status(500).json({
      error: 'error in delete movie'
    })
  }
}

const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.query.filter as string
    if (reqFilter !== undefined) {
      const movies = await createFilter(reqFilter, new Movie(), movieRepository)
      return res.json(movies)
    }

    const movies = await movieRepository.find()
    return res.json(movies)
  } catch (error) {
    return res.status(500).json({
      message: 'error in get all movies'
    })
  }
}

const likeAMovie = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user as User
    const movie = req.movie

    const likedMovieInstance = createLikedMovieInstanceService(movie, user)

    await createLikedMovieService(likedMovieInstance)

    return res.json({
      message: 'Successfully created'
    })
  } catch (error) {
    return res.json({
      message: 'error in like movie controller'
    })
  }
}

const getLikeCountForMovies = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const movies = await movieRepository.find({ relations: { likes: true } })

    return res.json(getLikeCountService(movies))
  } catch (error) {
    return res.json({
      message: 'error in get like count controller'
    })
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
