import { Router } from 'express'
import { swaggerDocs } from '../services'
import swaggerUi from 'swagger-ui-express'

const explorerRouter = Router()

explorerRouter.get('/', swaggerUi.setup(swaggerDocs))

explorerRouter.use('/', swaggerUi.serve)

export default explorerRouter
