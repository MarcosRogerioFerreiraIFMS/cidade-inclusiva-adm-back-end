import type {
  AcessibilidadeUrbanaRecursoResponseDTO,
  AcessibilidadeUrbanaResponseDTO
} from '@/dtos/response'
import type { AcessibilidadeUrbanaCompletions } from '@/types'
import { capitalizeWords } from '@/utils'
import { toEnderecoResponseDTO } from './enderecoOutputMapper'
import { toFotosResponseDTO, toLogoResponseDTO } from './fotoOutputMappers'

/**
 * - Converte recurso de acessibilidade urbana para DTO de resposta
 * - Aplica transformações de apresentação para simbolo e descrição
 * @param {unknown} recurso - Recurso de acessibilidade urbana do banco de dados
 * @returns {AcessibilidadeUrbanaRecursoResponseDTO} DTO formatado para resposta da API
 */
export function toAcessibilidadeUrbanaRecursoResponseDTO(
  recurso: unknown
): AcessibilidadeUrbanaRecursoResponseDTO {
  const r = recurso as Record<string, unknown>
  return {
    id: r.id as string,
    simbolo: capitalizeWords((r.simbolo as string).replace(/_/g, ' ')),
    descricao: (r.descricao as string) ?? undefined,
    criadoEm: r.criadoEm as Date
  }
}

/**
 * - Converte entidade AcessibilidadeUrbana completa para DTO de resposta
 * - Formata campos opcionais e aplica transformações de apresentação
 * @param {AcessibilidadeUrbanaCompletions} acessibilidadeUrbana - Entidade acessibilidade urbana completa do banco de dados
 * @returns {AcessibilidadeUrbanaResponseDTO} DTO formatado para resposta da API
 */
export function toAcessibilidadeUrbanaResponseDTO(
  acessibilidadeUrbana: AcessibilidadeUrbanaCompletions
): AcessibilidadeUrbanaResponseDTO {
  return {
    id: acessibilidadeUrbana.id,
    nome: acessibilidadeUrbana.nome,
    telefone: acessibilidadeUrbana.telefone,
    email: acessibilidadeUrbana.email,
    categoria: capitalizeWords(acessibilidadeUrbana.categoria),
    fotos: toFotosResponseDTO(acessibilidadeUrbana.fotos),
    recursos: acessibilidadeUrbana.recursos.map((recurso) =>
      toAcessibilidadeUrbanaRecursoResponseDTO(recurso)
    ),
    logo: toLogoResponseDTO(acessibilidadeUrbana.logo),
    endereco: toEnderecoResponseDTO(acessibilidadeUrbana.endereco),
    criadoEm: acessibilidadeUrbana.criadoEm
  }
}

/**
 * - Converte lista de entidades AcessibilidadeUrbana para lista de DTOs de resposta
 * - Aplica transformação individual para cada acessibilidade urbana da lista
 * @param {AcessibilidadeUrbanaCompletions[]} acessibilidadesUrbanas - Lista de entidades acessibilidade urbana do banco de dados
 * @returns {AcessibilidadeUrbanaResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toAcessibilidadesUrbanasResponseDTO(
  acessibilidadesUrbanas: AcessibilidadeUrbanaCompletions[]
): AcessibilidadeUrbanaResponseDTO[] {
  return acessibilidadesUrbanas.map(toAcessibilidadeUrbanaResponseDTO)
}
