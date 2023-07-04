import { type NextFunction, type Response } from 'express'
import type ICustomRequest from '../../dto/request/ICustomRequest'
import { errorMessageHandler } from '../../services'
import { movieRepository } from '../../repositories'
import { Status } from '../../dto'

const validateIdMovie = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const id = req.body.id !== undefined ? parseInt(req.body.id) : parseInt(req.params.id)

    const movie = await movieRepository.findOne({ where: { id } })

    if (movie === null) {
      return res.status(404).json({
        message: `The movie with the id ${id} does not exist`
      })
    }

    if (movie.status === Status.INACTIVE) {
      return res.status(400).json({
        message: 'The movie has been marked already as inactive'
      })
    }

    req.movie = movie

    next()
  } catch (error) {
    return res.status(500).json(errorMessageHandler(error, 'Error in validate id movie'))
  }
}

export default validateIdMovie
