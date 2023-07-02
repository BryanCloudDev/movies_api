import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../services/swagger'

const explorerRouter = Router()

explorerRouter.use('/', swaggerUi.serve)

explorerRouter.get('/', swaggerUi.setup(swaggerDocs))

export default explorerRouter
