import { type Response, type NextFunction } from 'express'
import { type ICustomRequest } from '../dto/request/ICustomRequest'
import { movieRepository } from '../repositories'

const validateIdMovie = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const id = req.body.id !== undefined ? parseInt(req.body.id) : parseInt(req.params.id)

    const movie = await movieRepository.findOne({ where: { id } })

    if (movie === null) {
      return res.json({
        message: `The movie with the id ${id} does not exist`
      })
    }

    req.movie = movie

    next()
  } catch (error) {

  }
}

export default validateIdMovie
