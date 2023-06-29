import { type Request, type Response } from 'express'
import { getUserbyIdService } from '../services/user'

const getUserbyId = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id)
    const user = getUserbyIdService(id)
    res.json(user)
  } catch (error: any) {
    res.status(500).json({
      error: 'error in get user by id'
    })
  }
}

export {
  getUserbyId
}
