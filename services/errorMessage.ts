import { makeLog } from './'

const errorMessageHandler = (_error: any, location: string): { message: string } => {
  const enviroment = process.env.NODE_ENV
  makeLog({
    error: _error.message,
    location
  })

  const message = enviroment !== undefined && enviroment !== 'development'
    ? 'Internal server error, please contact the administrator'
    : location

  return { message }
}

export default errorMessageHandler
