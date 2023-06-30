import { type Request, type Response } from 'express'
import { type IMovieRequest } from '../dto/movie/IMovieRequest'
import { createMovieInstanceService, createMovieService } from '../services/movie'
import { movieRepository } from '../repositories'

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

export {
  createMovie,
  updateMovie
}
