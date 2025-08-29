import { z } from 'zod'
import { createLoginSchema } from '../../schemas/LoginSchema'

export type LoginCreateDTO = z.infer<typeof createLoginSchema>
