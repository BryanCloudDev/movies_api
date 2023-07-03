import { createMovie, deleteMovie, getAllMovies, getLikeCountForMovies, getMoviesLikedByUser, updateMovie } from './movie'
import { createUser, deleteUser, getAllUsers, getUserProfile, getUserById, updateUser } from './user'
import { likeAMovie, unlikeAMovie } from './likedMovie'
import { login } from './auth'

export {
  createMovie,
  createUser,
  deleteMovie,
  deleteUser,
  getAllMovies,
  getAllUsers,
  getLikeCountForMovies,
  getMoviesLikedByUser,
  getUserProfile,
  getUserById,
  likeAMovie,
  login,
  unlikeAMovie,
  updateMovie,
  updateUser
}
