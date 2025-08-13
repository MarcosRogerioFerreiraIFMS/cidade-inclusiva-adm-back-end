import { z } from 'zod'
import { createComentarioSchema } from '../../schemas/ComentarioSchema'

export type ComentarioCreateDTO = z.infer<typeof createComentarioSchema>
