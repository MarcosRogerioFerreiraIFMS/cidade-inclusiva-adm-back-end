import { z } from 'zod'
import { updateUsuarioSchema } from '../../schemas/UsuarioSchema'

export type UsuarioUpdateDTO = z.infer<typeof updateUsuarioSchema>
