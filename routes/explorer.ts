import { Router } from 'express'
import { swaggerDocs } from '../services'
import swaggerUi from 'swagger-ui-express'
import { validateEnvForDocs } from '../middlewares'

const explorerRouter = Router()

explorerRouter.get('/',
  [
    validateEnvForDocs
  ],
  swaggerUi.setup(swaggerDocs)
)

explorerRouter.use('/', swaggerUi.serve)

export default explorerRouter
