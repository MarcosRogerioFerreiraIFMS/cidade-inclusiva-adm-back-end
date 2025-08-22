import { UsuarioCreateDTO } from '../../dtos/create/UsuarioCreateDTO'
import { UsuarioUpdateDTO } from '../../dtos/update/UsuarioUpdateDTO'
import { UsuarioCompletions } from '../../types/UsuarioTypes'

export interface IUsuarioAccess {
  create(data: UsuarioCreateDTO): Promise<UsuarioCompletions>
  findById(id: string): Promise<UsuarioCompletions | null>
  findByEmail(email: string): Promise<UsuarioCompletions | null>
  findByTelefone(telefone: string): Promise<UsuarioCompletions | null>
  update(id: string, data: UsuarioUpdateDTO): Promise<UsuarioCompletions>
  delete(id: string): Promise<void>
  findAll(): Promise<UsuarioCompletions[]>
}
