import { Router } from 'express'
import { param } from 'express-validator'
import { existsUserById } from '../services/user'
import { validateFields } from '../middlewares/validateFields'
import { getUserbyId } from '../controllers'

const userRouter = Router()

userRouter.get('/:id',
  [
    param('id').isNumeric(),
    param('id').custom(existsUserById),
    validateFields
  ], getUserbyId)

export default userRouter
