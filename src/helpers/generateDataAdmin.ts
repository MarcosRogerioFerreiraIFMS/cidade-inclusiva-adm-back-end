import type { AdminCreateDTO } from '@/dtos/create'
import { TipoUsuario } from '@/enums'
import { hashPassword } from '@/utils'
import type { Prisma } from '@prisma/client'
import { generateDataFotoUsuarioCreate } from './generateDataFoto'

/**
 * - Gera dados formatados para criação de administrador no Prisma
 * - Converte DTO de criação em input do Prisma, incluindo hash da senha
 * - Define tipo como ADMIN e aceita foto e endereço opcionais
 * @param {AdminCreateDTO} data - Dados do administrador vindos do DTO
 * @returns {Promise<Prisma.UsuarioCreateInput>} Dados formatados para o Prisma
 */
export async function generateDataAdminCreate({
  nome,
  telefone,
  email,
  senha,
  foto,
  endereco
}: AdminCreateDTO): Promise<Prisma.UsuarioCreateInput> {
  const hashedPassword = await hashPassword(senha)

  return {
    nome,
    telefone,
    foto: generateDataFotoUsuarioCreate(foto),
    email,
    senha: hashedPassword,
    tipo: TipoUsuario.ADMIN,
    endereco: endereco
      ? {
          create: {
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            complemento: endereco.complemento ?? null,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            cep: endereco.cep,
            estado: endereco.estado,
            pais: endereco.pais ?? 'Brasil'
          }
        }
      : {
          create: {
            logradouro: 'N/A',
            numero: 'N/A',
            cidade: 'N/A',
            bairro: 'N/A',
            cep: '00000000',
            estado: 'N/A',
            pais: 'Brasil'
          }
        }
  }
}
