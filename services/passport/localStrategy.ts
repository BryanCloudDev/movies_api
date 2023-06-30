import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { userRepository } from '../../repositories'
import { checkPassword } from '../auth'

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done: any) => {
    const user = await userRepository.findOne({ where: { email }, relations: { role: true } })

    if (user === null) {
      return done(null, false, {
        message: 'Email or passowrd incorrect'
      })
    }

    const isPasswordCorrect = await checkPassword(password, user.password)

    if (isPasswordCorrect === false) {
      return done(null, false, {
        message: 'Email or passowrd incorrect'
      })
    }

    return done(null, user)
  })
)

export {
  passport
}
