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
  id: number
  likes: number
  name: string
}> => {
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
