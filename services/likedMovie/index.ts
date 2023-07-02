import { type LikedMovie, type Movie, type User } from '../../models'
import { likedMoviesRepository } from '../../repositories'
import errorMessageHandler from '../errorMessage'

const createLikedMovieInstanceService = (movie: Movie, user: User): LikedMovie | undefined | { message: string } => {
  try {
    const likedMovie = likedMoviesRepository.create({ movie, user })
    return likedMovie
  } catch (error) {
    return errorMessageHandler(error, 'Error in create liked movie instance')
  }
}

const createLikedMovieService = async (likedMovie: LikedMovie): Promise<LikedMovie | undefined> => {
  try {
    const createdUser = await likedMoviesRepository.save(likedMovie)
    return createdUser
  } catch (error) {
    errorMessageHandler(error, 'Error in save liked movie')
  }
}

export {
  createLikedMovieInstanceService,
  createLikedMovieService
}
