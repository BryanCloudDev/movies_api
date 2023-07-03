import { createRole, deleteRole, getAllRoles } from './role'
import { createMovie, deleteMovie, getAllMovies, getLikeCountForMovies, getMoviesLikedByUser, updateMovie } from './movie'
import { createUser, deleteUser, getAllUsers, getUserProfile, getUserById, updateUser } from './user'
import { likeAMovie, unlikeAMovie } from './likedMovie'
import { login } from './auth'

export {
  createMovie,
  createRole,
  createUser,
  deleteMovie,
  deleteRole,
  deleteUser,
  getAllMovies,
  getAllRoles,
  getAllUsers,
  getLikeCountForMovies,
  getMoviesLikedByUser,
  getUserById,
  getUserProfile,
  likeAMovie,
  login,
  unlikeAMovie,
  updateMovie,
  updateUser
}
