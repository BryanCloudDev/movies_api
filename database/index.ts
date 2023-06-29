import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'

export const AppDataSource = new DataSource({
  database: process.env.DATABASE_NAME,
  entities: [],
  host: process.env.DATABASE_HOST,
  logging: false,
  migrations: [],
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  subscribers: [],
  synchronize: true,
  type: 'mysql',
  username: process.env.DATABASE_USER
})

export async function makeDBConnection (): Promise<void> {
  try {
    await AppDataSource.initialize()
    console.log('Successfully connected to DB')
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`)
    }
  }
}
