import { z } from 'zod'
import { updateProfissionalSchema } from '../../schemas/ProfissionalSchema'

export type ProfissionalUpdateDTO = z.infer<typeof updateProfissionalSchema>
