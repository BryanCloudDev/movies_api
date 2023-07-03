import { Router } from 'express'
import { login } from '../controllers'
import { body } from 'express-validator'
import { validateFields } from '../middlewares'

const authRouter = Router()

authRouter.post('/',
  [
    body('email', 'The email address is not valid').isEmail(),
    body('password', 'Password is required').notEmpty(),
    validateFields
  ],
  login
)

export default authRouter
