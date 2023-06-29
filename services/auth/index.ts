
import bcrypt from 'bcryptjs'

const encrypt = async (text: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(text, salt)
    return password
  } catch (error: any) {
    console.log(error)
    return ''
  }
}

export {
  encrypt
}
