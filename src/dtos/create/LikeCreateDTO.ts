import { z } from 'zod'
import { createLikeSchema } from '../../schemas/LikeSchema'

export type LikeCreateDTO = z.infer<typeof createLikeSchema>
