import { type Response } from 'express'
import type ICustomRequest from '../dto/request/ICustomRequest'
import { type User, LikedMovie } from '../models'
import { likedMoviesRepository } from '../repositories'
import errorMessageHandler from '../services/errorMessage'
import { createLikedMovieInstanceService, createLikedMovieService } from '../services/likedMovie'

const likeAMovie = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user as User
    const movie = req.movie

    const likedMovieInstance = createLikedMovieInstanceService(movie, user)

    if (!(likedMovieInstance instanceof LikedMovie)) {
      return res.status(500).json({
        message: likedMovieInstance?.message
      })
    }

    await createLikedMovieService(likedMovieInstance)

    return res.status(201).json({
      message: 'Successfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in like movie'))
  }
}

const unlikeAMovie = async (req: ICustomRequest, res: Response): Promise<Response> => {
  try {
    const likedMovie = req.like

    await likedMoviesRepository.delete(likedMovie.id)

    return res.status(200).json(likedMovie)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in unlike movie'))
  }
}

export {
  likeAMovie,
  unlikeAMovie
}
