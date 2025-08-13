import { z } from 'zod'
import { updateComentarioSchema } from '../../schemas/ComentarioSchema'

export type ComentarioUpdateDTO = z.infer<typeof updateComentarioSchema>
