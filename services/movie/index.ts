import { type IMovieRequest } from '../../dto/movie/IMovieRequest'
import { type Movie } from '../../models'
import { movieRepository } from '../../repositories'

const createMovieInstanceService = async (movieRequest: IMovieRequest): Promise<Movie> => {
  const movie = movieRepository.create({ ...movieRequest })
  return movie
}

const createMovieService = async (movie: Movie): Promise<Movie> => {
  const createdUser = await movieRepository.save(movie)
  return createdUser
}

const getLikeCountService = (movies: Movie[]): Array<{
  likes: number
  name: string
  description: string
  director: string
  genre: string
  releaseDate: Date
  duration: number
  rating: number
  countryOrigin: string
  language: string
  poster: string
  status: number
  id: number
}> => {
  const likedMovies = movies.map(movie => {
    const { createdOn, updatedOn, likes, ...movieRest } = movie
    return {
      ...movieRest,
      likes: likes.length
    }
  })

  return likedMovies
}

export {
  createMovieInstanceService,
  createMovieService,
  getLikeCountService
}
