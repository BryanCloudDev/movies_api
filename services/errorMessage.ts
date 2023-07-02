const errorMessageHandler = (_error: any, message: string): { message: string } => {
  console.log(_error.message)

  return { message }
}

export default errorMessageHandler
