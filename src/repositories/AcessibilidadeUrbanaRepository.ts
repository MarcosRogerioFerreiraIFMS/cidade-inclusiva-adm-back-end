import type { AcessibilidadeUrbanaCreateDTO } from '@/dtos/create'
import type { AcessibilidadeUrbanaUpdateDTO } from '@/dtos/update'
import type { IAcessibilidadeUrbanaAccess } from '@/interfaces/access'
import type { AcessibilidadeUrbanaCompletions } from '@/types'

/**
 * Repository responsável por operações de acesso a dados de acessibilidade urbana
 * Atua como uma camada de abstração entre o serviço e o DAO
 */
export class AcessibilidadeUrbanaRepository
  implements IAcessibilidadeUrbanaAccess
{
  /**
   * Construtor do repositório de acessibilidade urbana
   * @param {IAcessibilidadeUrbanaAccess} acessibilidadeUrbanaDAO - DAO para acesso aos dados de acessibilidade urbana
   */
  constructor(private acessibilidadeUrbanaDAO: IAcessibilidadeUrbanaAccess) {}

  /**
   * Cria uma nova acessibilidade urbana
   * @param {AcessibilidadeUrbanaCreateDTO} data - Dados para criação
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana criada
   */
  async create(
    data: AcessibilidadeUrbanaCreateDTO
  ): Promise<AcessibilidadeUrbanaCompletions> {
    return await this.acessibilidadeUrbanaDAO.create(data)
  }

  /**
   * Busca uma acessibilidade urbana por ID
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  async findById(id: string): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await this.acessibilidadeUrbanaDAO.findById(id)
  }

  /**
   * Atualiza uma acessibilidade urbana existente
   * @param {string} id - ID único da acessibilidade urbana
   * @param {AcessibilidadeUrbanaUpdateDTO} data - Dados para atualização
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana atualizada
   */
  async update(
    id: string,
    data: AcessibilidadeUrbanaUpdateDTO
  ): Promise<AcessibilidadeUrbanaCompletions> {
    return await this.acessibilidadeUrbanaDAO.update(id, data)
  }

  /**
   * Remove uma acessibilidade urbana
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await this.acessibilidadeUrbanaDAO.delete(id)
  }

  /**
   * Lista todas as acessibilidades urbanas
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de acessibilidades urbanas
   */
  async findAll(): Promise<AcessibilidadeUrbanaCompletions[]> {
    return await this.acessibilidadeUrbanaDAO.findAll()
  }

  /**
   * Busca acessibilidade urbana por email
   * @param {string} email - Email da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  async findByEmail(
    email: string
  ): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await this.acessibilidadeUrbanaDAO.findByEmail(email)
  }

  async findByTelefone(
    telefone: string
  ): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await this.acessibilidadeUrbanaDAO.findByTelefone(telefone)
  }

  /**
   * Busca acessibilidades urbanas por categoria
   * @param {string} categoria - Categoria da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de acessibilidades urbanas
   */
  async findByCategoria(
    categoria: string
  ): Promise<AcessibilidadeUrbanaCompletions[]> {
    return await this.acessibilidadeUrbanaDAO.findByCategoria(categoria)
  }
}
