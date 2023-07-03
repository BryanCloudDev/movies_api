import { type LikedMovie, type Movie, type User } from '../../models'
import { likedMoviesRepository } from '../../repositories'
import { errorMessageHandler } from '../'

const createLikedMovieInstanceService = (movie: Movie, user: User): LikedMovie => {
  try {
    const likedMovie = likedMoviesRepository.create({ movie, user })
    return likedMovie
  } catch (error) {
    throw new Error(errorMessageHandler(error, 'Error in create liked movie instance').message)
  }
}

const createLikedMovieService = async (likedMovie: LikedMovie): Promise<LikedMovie> => {
  try {
    const createdUser = await likedMoviesRepository.save(likedMovie)
    return createdUser
  } catch (error) {
    throw new Error(errorMessageHandler(error, 'Error in save liked movie').message)
  }
}

export {
  createLikedMovieInstanceService,
  createLikedMovieService
}
