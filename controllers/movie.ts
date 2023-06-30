import { type Request, type Response } from 'express'
import { type IMovieRequest } from '../dto/movie/IMovieRequest'
import { createMovieInstanceService, createMovieService } from '../services/movie'
import { movieRepository } from '../repositories'
import { Status } from '../dto/enums/status'

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

export {
  createMovie,
  deleteMovie,
  updateMovie
}
