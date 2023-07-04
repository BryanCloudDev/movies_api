import express, { Router } from 'express'
import { makeDBConnection } from '../database'
import 'dotenv/config'
import { authRouter, explorerRouter, movieRouter, roleRouter, userRouter } from '../routes'
import cors from 'cors'
import { createMultipleDummyUsers } from '../services/seeder/user'
import { Roles } from '../dto'
import { validateJSON } from '../middlewares'
import { roleRepository } from '../repositories'
import createInitialRoles from '../services/seeder/role'
import { createMultipleDummyMovies } from '../services/seeder/movie'

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
  }

  private async connectToDB (): Promise<void> {
    await makeDBConnection()
    void this.runSeeder()
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

  public async runSeeder (): Promise<void> {
    console.log()
    const enviroment = process.env.NODE_ENV
    if (enviroment !== undefined && enviroment !== 'development') {
      const roles = await roleRepository.count()
      if (roles === 0) {
        await createInitialRoles(['ADMINISTRATOR', 'USER'])
        await createMultipleDummyUsers(10, Roles.USER)
        await createMultipleDummyMovies(20)
      }
    }
  }
}
