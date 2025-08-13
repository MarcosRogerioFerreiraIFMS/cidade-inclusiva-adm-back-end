import { Comentario, Profissional } from '@prisma/client'
import { ProfissionalResponseDTO } from '../../dtos/response/ProfissionalResponseDTO'
import { capitalizeWords } from '../../utils/stringUtils'
import { toComentarioResponseDTO } from './comentarioOutputMapper'

type ProfissionalWithComentarios = Profissional & {
  comentarios?: Comentario[]
}

export function toProfissionalResponseDTO(
  profissional: ProfissionalWithComentarios
): ProfissionalResponseDTO {
  return {
    id: profissional.id,
    nome: profissional.nome,
    foto: profissional.foto ?? undefined,
    telefone: profissional.telefone,
    email: profissional.email,
    especialidade: capitalizeWords(profissional.especialidade),
    comentarios: profissional.comentarios?.map((comentario) =>
      toComentarioResponseDTO(comentario)
    )
  }
}

export function toProfissionaisResponseDTO(
  profissionais: ProfissionalWithComentarios[]
): ProfissionalResponseDTO[] {
  return profissionais.map(toProfissionalResponseDTO)
}
