import FilterResponse from './FilterResponse'
import { checkIfRoleIsSent, createUserInstanceService, createUserService, emailExists, getUserbyIdService, userValidationRules } from './user'
import { checkPassword, encrypt, generateJWT } from './auth'
import { createLikedMovieInstanceService, createLikedMovieService } from './likedMovie'
import { createMovieInstanceService, createMovieService, getLikeCountService } from './movie'
import { createRoleInstanceService, createRoleService, getRoleByIdService } from './role'
import { createUriComponent, getFilter } from './utils/utils'
import createFilter from './createFilter'
import errorMessageHandler from './errorMessage'
import makeLog from './logger'
import passport from './passport/localStrategy'
import swaggerDocs from './swagger'

export {
  FilterResponse,
  checkIfRoleIsSent,
  checkPassword,
  createFilter,
  createLikedMovieInstanceService,
  createLikedMovieService,
  createMovieInstanceService,
  createMovieService,
  createRoleInstanceService,
  createRoleService,
  createUriComponent,
  createUserInstanceService,
  createUserService,
  emailExists,
  encrypt,
  errorMessageHandler,
  generateJWT,
  getFilter,
  getLikeCountService,
  getRoleByIdService,
  getUserbyIdService,
  makeLog,
  passport,
  swaggerDocs,
  userValidationRules
}
