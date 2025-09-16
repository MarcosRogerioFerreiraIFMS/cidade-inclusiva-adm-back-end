import type { EnderecoResponseDTO } from '@/dtos/response'
import type { Endereco } from '@prisma/client'

/**
 * - Converte entidade Endereco para DTO de resposta
 * - Trata valores opcionais e estrutura dados de endereço
 * @param {Endereco | null} endereco - Entidade endereco do banco de dados
 * @returns {UsuarioResponseDTO['endereco'] | undefined} DTO de endereço ou undefined se não existir
 */
export function toEnderecoResponseDTO(
  endereco: Endereco | null | undefined
): EnderecoResponseDTO | undefined {
  if (!endereco) return undefined

  return {
    id: endereco.id,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    complemento: endereco.complemento ?? '',
    cidade: endereco.cidade,
    bairro: endereco.bairro,
    cep: endereco.cep,
    estado: endereco.estado,
    pais: endereco.pais
  }
}
