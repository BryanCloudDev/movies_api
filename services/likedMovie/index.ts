import { type LikedMovie, type Movie, type User } from '../../models'
import { likedMoviesRepository } from '../../repositories'

const createLikedMovieInstanceService = (movie: Movie, user: User): LikedMovie => {
  const likedMovie = likedMoviesRepository.create({ movie, user })
  return likedMovie
}

const createLikedMovieService = async (likedMovie: LikedMovie): Promise<LikedMovie> => {
  const createdUser = await likedMoviesRepository.save(likedMovie)
  return createdUser
}

export {
  createLikedMovieInstanceService,
  createLikedMovieService
}
