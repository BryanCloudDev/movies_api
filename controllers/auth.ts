import { type Request, type Response } from 'express'
import { type ILoginRequest } from '../dto/auth/ILoginRequest'
import { userRepository } from '../repositories'
import { checkPassword, generateJWT } from '../services/auth'

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: ILoginRequest = req.body

  const user = await userRepository.findOne({ where: { email } })

  if (user === null) {
    return res.json({
      message: `User not found with email address ${email}`
    })
  }

  const isPasswordCorrect = await checkPassword(password, user.password)

  if (isPasswordCorrect === false) {
    return res.json({
      message: 'Invalid password'
    })
  }

  const token = await generateJWT({ id: user.id, email: user.email })

  return res.json({
    token
  })
}

export {
  login
}
