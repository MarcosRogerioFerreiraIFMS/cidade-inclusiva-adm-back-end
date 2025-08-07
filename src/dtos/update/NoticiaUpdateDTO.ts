import { z } from 'zod'
import { updateNoticiaSchema } from '../../schemas/NoticiaSchema'

export type NoticiaUpdateDTO = z.infer<typeof updateNoticiaSchema>
