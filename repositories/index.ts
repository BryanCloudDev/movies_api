import { AppDataSource } from '../database'
import { LikedMovie, Movie, User } from '../models'

const userRepository = AppDataSource.getRepository(User)
const movieRepository = AppDataSource.getRepository(Movie)
const likedMoviesRepository = AppDataSource.getRepository(LikedMovie)

export {
  userRepository,
  movieRepository,
  likedMoviesRepository
}
