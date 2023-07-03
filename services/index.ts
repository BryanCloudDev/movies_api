import { checkIfRoleIsSent, createUserInstanceService, createUserService, emailExists, getUserbyIdService, userValidationRules } from './user'
import { checkPassword, encrypt, generateJWT } from './auth'
import { createLikedMovieInstanceService, createLikedMovieService } from './likedMovie'
import { createMovieInstanceService, createMovieService, getLikeCountService } from './movie'
import { createRoleInstanceService, createRoleService, getRoleByIdService } from './role'
import { createUriComponent } from './utils/utils'
import createFilter from './createFilter'
import errorMessageHandler from './errorMessage'
import passport from './passport/localStrategy'
import swaggerDocs from './swagger'

export {
  checkIfRoleIsSent,
  createFilter,
  createMovieService,
  createRoleInstanceService,
  createRoleService,
  createUriComponent,
  createUserInstanceService,
  createUserService,
  emailExists,
  errorMessageHandler,
  getLikeCountService,
  getRoleByIdService,
  getUserbyIdService,
  passport,
  swaggerDocs,
  userValidationRules,
  checkPassword,
  createLikedMovieInstanceService,
  createLikedMovieService,
  createMovieInstanceService,
  encrypt,
  generateJWT
}
