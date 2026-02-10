import { Router } from 'express'
// @ts-ignore
import { router as userRouter } from './user.route.ts'

export const router = Router()

router.use('/users', userRouter)