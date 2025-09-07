import { ProfissionalResponseDTO } from '../../dtos/response/ProfissionalResponseDTO'
import { ProfissionalCompletions } from '../../types/ProfissionalTypes'

import { capitalizeWords } from '../../utils/stringUtils'
import { toComentarioResponseDTO } from './comentarioOutputMapper'
import { toFotoResponseDTO } from './fotoOutputMapper'

/**
 * - Converte entidade Profissional completa para DTO de resposta
 * - Formata campos opcionais, capitaliza especialidade e inclui comentários
 * @param {ProfissionalCompletions} profissional - Entidade profissional completa do banco de dados
 * @returns {ProfissionalResponseDTO} DTO formatado para resposta da API
 */
export function toProfissionalResponseDTO(
  profissional: ProfissionalCompletions
): ProfissionalResponseDTO {
  return {
    id: profissional.id,
    nome: profissional.nome,
    foto: toFotoResponseDTO(profissional.foto),
    telefone: profissional.telefone,
    email: profissional.email,
    especialidade: capitalizeWords(profissional.especialidade),
    criadoEm: profissional.criadoEm,
    comentarios: profissional.comentarios.map((comentario) =>
      toComentarioResponseDTO(comentario)
    )
  }
}

/**
 * - Converte lista de entidades Profissional para lista de DTOs de resposta
 * - Aplica transformação individual para cada profissional da lista
 * @param {ProfissionalCompletions[]} profissionais - Lista de entidades profissional do banco de dados
 * @returns {ProfissionalResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toProfissionaisResponseDTO(
  profissionais: ProfissionalCompletions[]
): ProfissionalResponseDTO[] {
  return profissionais.map(toProfissionalResponseDTO)
}
