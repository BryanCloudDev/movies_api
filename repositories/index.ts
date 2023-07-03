import { AppDataSource } from '../database'
import { LikedMovie, Movie, Role, User } from '../models'

const likedMoviesRepository = AppDataSource.getRepository(LikedMovie)
const movieRepository = AppDataSource.getRepository(Movie)
const roleRepository = AppDataSource.getRepository(Role)
const userRepository = AppDataSource.getRepository(User)

export {
  likedMoviesRepository,
  movieRepository,
  roleRepository,
  userRepository
}
