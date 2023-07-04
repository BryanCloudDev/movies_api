import express, { Router } from 'express'
import { makeDBConnection } from '../database'
import 'dotenv/config'
import { authRouter, explorerRouter, movieRouter, roleRouter, userRouter } from '../routes'
import cors from 'cors'
import { UserFactory } from '../services/seeder/user'
import { roleRepository } from '../repositories'
import { Roles } from '../dto'
import { validateJSON } from '../middlewares'

export default class Server {
  constructor (
    readonly _app = express(),
    readonly _apiRouter = Router(),
    readonly _port = Number(process.env.PORT),
    readonly _apiRoute = '/api',
    readonly _explorerRoute = '/explorer',
    readonly _loginRoute = '/login',
    readonly _movieRoute = '/movies',
    readonly _roleRoute = '/roles',
    readonly _userRoute = '/users'
  ) {
    void this.connectToDB()
    this.middleware()
    this.routes()
    // void this.runSeeder()
  }

  private async connectToDB (): Promise<void> {
    await makeDBConnection()
  }

  private middleware (): void {
    // JSON PARSER

    this._app.use(express.json())

    this._app.use(validateJSON)

    this._app.use(cors({
      origin: 'http://127.0.0.1:5500'
    }))
  }

  private routes (): void {
    this._apiRouter.use(this._explorerRoute, explorerRouter)
    this._apiRouter.use(this._loginRoute, authRouter)
    this._apiRouter.use(this._movieRoute, movieRouter)
    this._apiRouter.use(this._userRoute, userRouter)
    this._apiRouter.use(this._roleRoute, roleRouter)

    // API route
    this._app.use(this._apiRoute, this._apiRouter)
  }

  public listener (): void {
    this._app.listen(this._port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this._port}`)
    })
  }

  // public async runSeeder (): Promise<void> {
  //   const role = await roleRepository.findOne({ where: { id: Roles.USER } })

  //   console.log(role)
    

  //   if (role === null) {
  //     throw new Error('Role not found')
  //   }

  //   const userFactory = new UserFactory(role)

  //   console.log(userFactory.createDummyUser())
  // }
}
