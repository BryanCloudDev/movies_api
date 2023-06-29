import express, { Router } from 'express'
import { makeDBConnection } from '../database'
import 'dotenv/config'
import { userRouter } from '../routes'

export default class Server {
  constructor (
    readonly _app = express(),
    readonly _apiRouter = Router(),
    readonly _port = Number(process.env.PORT),
    readonly _apiRoute = '/api',
    readonly _userRoute = '/user',
    readonly _movieRoute = '/movie'
  ) {
    void this.connectToDB()
    this.middleware()
    this.routes()
  }

  private async connectToDB (): Promise<void> {
    await makeDBConnection()
  }

  private middleware (): void {
    // JSON PARSER
    this._app.use(express.json())
  }

  private routes (): void {
    this._apiRouter.use(this._userRoute, userRouter)
    this._app.use(this._apiRoute, this._apiRouter)
  }

  public listener (): void {
    this._app.listen(this._port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this._port}`)
    })
  }
}
