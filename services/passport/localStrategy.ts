import passport from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { checkPassword } from '../auth'
import { errorMessageHandler } from '../'
import { userRepository } from '../../repositories'

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done: any) => {
    try {
      const user = await userRepository.findOne({ where: { email }, relations: { role: true } })

      if (user === null) {
        return done(null, false, {
          message: 'Email or passowrd incorrect'
        })
      }

      const isPasswordCorrect = await checkPassword(password, user.password)

      if (!isPasswordCorrect) {
        return done(null, false, {
          message: 'Email or passowrd incorrect'
        })
      }

      return done(null, user)
    } catch (error: any) {
      errorMessageHandler(error, 'Error in passport local')

      done(null, false, {
        message: 'Email or passowrd incorrect'
      })
    }
  })
)

passport.use(
  new JWTStrategy({
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (token: any, done: any) => {
    try {
      const user = await userRepository.findOne({ where: { id: token.id }, relations: { role: true } })

      if (user === null) {
        return done(null, false, {
          message: 'JWT is invalid'
        })
      }

      done(null, user)
    } catch (error: any) {
      errorMessageHandler(error, 'Error in passport jwt')

      return done(null, false, {
        message: 'JWT is invalid'
      })
    }
  })
)

export default passport
