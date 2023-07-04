import { type LikedMovie, type Movie, type User } from '../../models'
import { likedMoviesRepository, movieRepository, userRepository } from '../../repositories'
import { createLikedMovieInstanceService } from '../likedMovie'

const createDummyLikeMovie = (user: User, movie: Movie): LikedMovie => {
  return createLikedMovieInstanceService(movie, user)
}

const createMultipleDummyLikeMovies = async (count: number): Promise<void> => {
  const moviePromises: Array<Promise<LikedMovie>> = []

  const users = await userRepository.find()
  const movies = await movieRepository.find()

  for (let i = 0; i < count; i++) {
    const randomUserIndex = Math.floor(Math.random() * users.length)
    const randomMovieindex = Math.floor(Math.random() * movies.length)
    const likedMovieInstance = createDummyLikeMovie(users[randomUserIndex], movies[randomMovieindex])
    moviePromises.push(likedMoviesRepository.save(likedMovieInstance))
  }

  await Promise.all(moviePromises)
}

export {
  createDummyLikeMovie,
  createMultipleDummyLikeMovies
}
