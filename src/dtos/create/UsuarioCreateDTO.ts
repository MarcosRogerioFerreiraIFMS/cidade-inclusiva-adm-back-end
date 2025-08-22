import { z } from 'zod'
import { createUsuarioSchema } from '../../schemas/UsuarioSchema'

export type UsuarioCreateDTO = z.infer<typeof createUsuarioSchema>
