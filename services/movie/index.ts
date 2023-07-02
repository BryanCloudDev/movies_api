import type IMovieRequest from '../../dto/movie/IMovieRequest'
import { type Movie } from '../../models'
import { movieRepository } from '../../repositories'
import errorMessageHandler from '../errorMessage'

const createMovieInstanceService = async (movieRequest: IMovieRequest): Promise<Movie | undefined | { message: string }> => {
  try {
    const movie = movieRepository.create({ ...movieRequest })
    return movie
  } catch (error: any) {
    return errorMessageHandler(error, 'Error in create movie instance')
  }
}

const createMovieService = async (movie: Movie): Promise<Movie | undefined> => {
  try {
    const createdUser = await movieRepository.save(movie)
    return createdUser
  } catch (error: any) {
    errorMessageHandler(error, 'Error in save movie')
  }
}

const getLikeCountService = (movies: Movie[]): Array<{ id: number, likes: number, name: string }> => {
  const likedMovies = movies.map(movie => {
    const { id, name, likes } = movie
    return {
      id,
      name,
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
