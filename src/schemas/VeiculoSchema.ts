import { z } from 'zod'

export const veiculoSchema = z.object({
  placa: z.string().nonempty('Placa é obrigatória'),
  marca: z.string().nonempty('Marca é obrigatória'),
  modelo: z.string().nonempty('Modelo é obrigatório'),
  motoristaId: z.string().nonempty('ID do motorista é obrigatório')
})

export const veiculoUpdateSchema = veiculoSchema.partial()
