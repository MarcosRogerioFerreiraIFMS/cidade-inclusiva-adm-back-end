import { LikeCreateDTO } from '../../dtos/create/LikeCreateDTO'
import { createLikeSchema } from '../../schemas/LikeSchema'

export function toCreateLikeDTO(data: unknown): LikeCreateDTO {
  return createLikeSchema.parse(data)
}
