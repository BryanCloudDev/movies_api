import { Router } from 'express'
import { login } from '../controllers'
import { body } from 'express-validator'
import { validateFields } from '../middlewares'

const authRouter = Router()

authRouter.post('/',
  [
    body('email', 'The email address is not valid').isEmail().trim(),
    body('password', 'Password is required').notEmpty().trim(),
    validateFields
  ],
  login
)

export default authRouter
