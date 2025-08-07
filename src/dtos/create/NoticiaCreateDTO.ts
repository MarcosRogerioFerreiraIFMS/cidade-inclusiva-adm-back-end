import { z } from 'zod'
import { createNoticiaSchema } from '../../schemas/NoticiaSchema'

export type NoticiaCreateDTO = z.infer<typeof createNoticiaSchema>
