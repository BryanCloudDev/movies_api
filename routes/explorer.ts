import { Router } from 'express'
import swaggerDocs from '../services/swagger'
import swaggerUi from 'swagger-ui-express'

const explorerRouter = Router()

explorerRouter.use('/', swaggerUi.serve)

explorerRouter.get('/', swaggerUi.setup(swaggerDocs))

export default explorerRouter
