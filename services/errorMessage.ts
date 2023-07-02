const errorMessageHandler = (_error: any, message: string): { message: string } => {
  console.log({
    error: _error.message,
    message
  })

  return { message }
}

export default errorMessageHandler
