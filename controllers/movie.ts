import { type FindOptionsRelations, type FindOptionsWhere } from 'typeorm'
import { type ICustomRequest, type IMovieRequest, Status } from '../dto'
import { type Request, type Response } from 'express'
import { Movie } from '../models'
import { createFilter, createMovieInstanceService, createMovieService, errorMessageHandler, getLikeCountService } from '../services'
import { movieRepository } from '../repositories'

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movieRequest: IMovieRequest = req.body

    const movieInstance = createMovieInstanceService(movieRequest)

    await createMovieService(movieInstance)

    return res.status(201).json({
      message: 'Succesfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in create movie'))
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

const getAllMovies = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.filter
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

const getLikeCountForMovies = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.filter
    if (reqFilter !== undefined) {
      const relationsFilter: FindOptionsRelations<Movie> | undefined = { likes: true }
      reqFilter.relations = relationsFilter

      const { response: movies, links, meta } = await createFilter(reqFilter, new Movie(), movieRepository)
      const transformedMovies = getLikeCountService(movies as Movie[])

      return res.status(200).json({
        response: transformedMovies,
        meta,
        links
      })
    }

    const movies = await movieRepository.find({ relations: { likes: true } })

    return res.status(200).json(getLikeCountService(movies))
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get likes count'))
  }
}

const getMoviesLikedByUser = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const reqFilter = req.filter
    if (reqFilter !== undefined) {
      const whereFilter: FindOptionsWhere<Movie> | undefined = { likes: { user: { id } } }
      reqFilter.where = whereFilter

      const movies = await createFilter(reqFilter, new Movie(), movieRepository)
      return res.status(200).json(movies)
    }

    const movies = await movieRepository.find({ where: { likes: { user: { id } } }, select: ['id', 'name', 'description', 'poster'] })

    return res.status(200).json(movies)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get movies liked by user'))
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

export {
  createMovie,
  deleteMovie,
  getAllMovies,
  getLikeCountForMovies,
  getMoviesLikedByUser,
  updateMovie
}
