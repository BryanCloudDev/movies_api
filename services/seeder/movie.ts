import { faker } from '@faker-js/faker'
import { createMovieInstanceService } from '../movie'
import { type Movie } from '../../models'
import { type IMovieRequest } from '../../dto'
import { movieRepository } from '../../repositories'

function createDummyMovie (): Movie {
  const movie: IMovieRequest = {
    countryOrigin: faker.location.country(),
    description: faker.lorem.paragraph(),
    director: faker.person.fullName(),
    duration: faker.number.int({ min: 60, max: 180 }),
    genre: faker.helpers.arrayElement([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Thriller'
    ]),
    language: faker.location.countryCode(),
    name: faker.lorem.words(2),
    poster: faker.image.urlLoremFlickr(),
    rating: faker.number.float({ min: 0.1, max: 10, precision: 0.1 }),
    releaseDate: faker.date.past()
  }

  return createMovieInstanceService({ ...movie })
}

const createMultipleDummyMovies = async (count: number): Promise<void> => {
  const moviePromises: Array<Promise<Movie>> = []

  for (let i = 0; i < count; i++) {
    const user = createDummyMovie()
    moviePromises.push(movieRepository.save(user))
  }

  await Promise.all(moviePromises)
}

export {
  createDummyMovie,
  createMultipleDummyMovies
}
