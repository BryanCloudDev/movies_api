import { type IMovieLikeCount, type IMovieRequest } from '../../dto'
import { type Movie } from '../../models'
import { errorMessageHandler } from '../'
import { movieRepository } from '../../repositories'

const createMovieInstanceService = (movieRequest: IMovieRequest): Movie => {
  try {
    const movie = movieRepository.create({ ...movieRequest })
    return movie
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in create movie instance').message)
  }
}

const createMovieService = async (movie: Movie): Promise<Movie> => {
  try {
    const createdUser = await movieRepository.save(movie)
    return createdUser
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in save movie').message)
  }
}

const getLikeCountService = (movies: Movie[]): IMovieLikeCount[] => {
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
