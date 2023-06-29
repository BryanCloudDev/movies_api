import { AppDataSource } from '../database'
import { LikedMovie, Movie, Role, User } from '../models'

const userRepository = AppDataSource.getRepository(User)
const movieRepository = AppDataSource.getRepository(Movie)
const likedMoviesRepository = AppDataSource.getRepository(LikedMovie)
const roleRepository = AppDataSource.getRepository(Role)

export {
  userRepository,
  movieRepository,
  likedMoviesRepository,
  roleRepository
}
