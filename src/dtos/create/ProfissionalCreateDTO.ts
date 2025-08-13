import { z } from 'zod'
import { createProfissionalSchema } from '../../schemas/ProfissionalSchema'

export type ProfissionalCreateDTO = z.infer<typeof createProfissionalSchema>
