import { makeLog } from './'

const errorMessageHandler = (_error: any, message: string): { message: string } => {
  makeLog({
    error: _error.message,
    message
  })

  return { message }
}

export default errorMessageHandler
