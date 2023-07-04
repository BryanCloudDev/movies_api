import winston from 'winston'

const loggerHandler = (): winston.Logger => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console({ level: 'error' })
    ]
  })
}

const makeLog = (message: { error: string, location: string }): void => {
  const logger = loggerHandler()
  logger.error(message)
}

export default makeLog
