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

export {
  createMovieInstanceService,
  createMovieService
}
