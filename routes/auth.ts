import { Router } from 'express'
import { login } from '../controllers/auth'

const authRouter = Router()

authRouter.post('/', login)

export default authRouter
