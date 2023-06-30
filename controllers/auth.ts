import { type Request, type Response } from 'express'
import { type ILoginRequest } from '../dto/auth/ILoginRequest'
import { userRepository } from '../repositories'
import { checkPassword, generateJWT } from '../services/auth'

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: ILoginRequest = req.body

    const user = await userRepository.findOne({ where: { email }, relations: { role: true } })

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

    const token = await generateJWT({ id: user.id, email: user.email, role: user.role.id })

    return res.json({
      token
    })
  } catch (error) {
    console.log(error.message)

    return res.status(500).json({
      error: 'error in login'
    })
  }
}

export {
  login
}
