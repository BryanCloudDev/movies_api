
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type IJwtPayload from '../../dto/auth/IJwtpayload'
import errorMessageHandler from '../errorMessage'

const encrypt = async (text: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(text, salt)
    return password
  } catch (error: any) {
    errorMessageHandler(error, 'Error in password encryption')
    return ''
  }
}

const checkPassword = async (password: string, hash: string): Promise<boolean | undefined> => {
  try {
    const isCorrect = await bcrypt.compare(password, hash)
    return isCorrect
  } catch (error: any) {
    errorMessageHandler(error, 'Error in password verification')
  }
}

const generateJWT = (data: IJwtPayload): any => {
  return new Promise((resolve, reject) => {
    const payload = {
      ...data
    }

    jwt.sign(payload, String(process.env.JWT_KEY), { expiresIn: '1h' }, (err: Error, token: string) => {
      if (err !== null) {
        errorMessageHandler(err, 'Error in JWT generation')
        reject(new Error('JWT could not be generated'))
      }
      resolve(token)
    })
  })
}

export {
  encrypt,
  checkPassword,
  generateJWT
}
