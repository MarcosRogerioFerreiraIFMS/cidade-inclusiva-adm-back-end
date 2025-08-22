import { ProfissionalResponseDTO } from '../../dtos/response/ProfissionalResponseDTO'
import { ProfissionalCompletions } from '../../types/ProfissionalTypes'
import { removeNullUndefinedProperties } from '../../utils/objectUtils'
import { capitalizeWords } from '../../utils/stringUtils'
import { toComentarioResponseDTO } from './comentarioOutputMapper'

export function toProfissionalResponseDTO(
  profissional: ProfissionalCompletions
): ProfissionalResponseDTO {
  return removeNullUndefinedProperties({
    id: profissional.id,
    nome: profissional.nome,
    foto: profissional.foto ?? undefined,
    telefone: profissional.telefone,
    email: profissional.email,
    especialidade: capitalizeWords(profissional.especialidade),
    criadoEm: profissional.criadoEm,
    comentarios: profissional.comentarios.map((comentario) =>
      toComentarioResponseDTO(comentario)
    )
  })
}

export function toProfissionaisResponseDTO(
  profissionais: ProfissionalCompletions[]
): ProfissionalResponseDTO[] {
  return profissionais.map(toProfissionalResponseDTO)
}
