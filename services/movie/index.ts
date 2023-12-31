import { type IMovieLikeCount, type IMovieRequest } from '../../dto'
import { type Movie } from '../../models'
import { errorMessageHandler } from '../'
import { movieRepository } from '../../repositories'
import { body, param } from 'express-validator'

const createMovieInstanceService = (movieRequest: IMovieRequest): Movie => {
  try {
    const movie = movieRepository.create({ ...movieRequest })
    return movie
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in create movie instance').message)
  }
}

const createMovieService = async (movie: Movie): Promise<Movie> => {
  try {
    const createdUser = await movieRepository.save(movie)
    return createdUser
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in save movie').message)
  }
}

const getLikeCountService = (movies: Movie[]): IMovieLikeCount[] => {
  const likedMovies = movies.map(movie => {
    const { id, name, likes } = movie

    return {
      id,
      name,
      likes: likes.length
    }
  })

  return likedMovies
}

const movieOptionalValidations = [
  body('countryOrigin', 'The country must have a valid value').optional().notEmpty().isString().trim(),
  body('director', 'The director must have a valid value').optional().notEmpty().isString().trim(),
  body('duration', 'The duration must have a valid value').optional().isInt({ min: 1, max: 360 }),
  body('poster', 'The poster must be a valid URL').optional().isURL().trim(),
  body('releaseDate', 'The release date must be a valid date').optional().isISO8601()
]

const moviePatchValidations = [
  param('id').isNumeric(),
  body('description', 'The description must have a valid value').optional().notEmpty().isLength({ max: 3000 }).trim(),
  body('genre', 'The genre must have a valid value').optional().notEmpty().isString().trim(),
  body('language', 'The language must have a valid value').optional().notEmpty().isString().isLength({ max: 30 }).trim(),
  body('name', 'The name must have a valid value').optional().notEmpty().isString().isLength({ max: 30 }).trim(),
  body('rating', 'The rating must be a float').optional().isFloat({ min: 0, max: 10 }),
  body('status', 'The status must be an integer').optional().isInt(),
  ...movieOptionalValidations
]

const moviePostValidations = [
  body('description', 'The description is mandatory').notEmpty().isLength({ max: 3000 }).trim(),
  body('genre', 'The genre is mandatory').notEmpty().isString().trim(),
  body('language', 'The language is mandatory').notEmpty().isString().isLength({ max: 30 }).trim(),
  body('name', 'The name is mandatory').notEmpty().isString().isLength({ max: 30 }).trim(),
  body('rating', 'The rating must be a float between 0 and 10').isFloat({ min: 0, max: 10 }),
  ...movieOptionalValidations
]

export {
  createMovieInstanceService,
  createMovieService,
  getLikeCountService,
  moviePatchValidations,
  moviePostValidations
}
