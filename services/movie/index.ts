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

const existsMovieById = async (id: number): Promise<void> => {
  const movie = await movieRepository.findOne({ where: { id } })
  if (movie === null) throw new Error(`The movie with the id ${id} does not exist`)
}

export {
  createMovieInstanceService,
  createMovieService,
  existsMovieById
}
