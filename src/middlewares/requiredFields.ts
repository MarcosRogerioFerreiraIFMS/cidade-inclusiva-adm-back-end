/**
 * - Define os campos obrigatórios para diferentes operações em várias entidades.
 * - Usado para validação de requisições em middlewares.
 * - Cada entidade tem listas separadas para criação e atualização.
 * - Campos podem ser ajustados conforme requisitos do negócio.
 */
export const requiredFields = {
  usuario: {
    create: ['nome', 'telefone', 'email', 'senha', 'endereco'],
    update: []
  },
  admin: {
    create: ['nome', 'telefone', 'email', 'senha']
  },
  noticia: {
    create: ['titulo', 'conteudo', 'categoria'],
    update: []
  },
  profissional: {
    create: ['nome', 'telefone', 'email', 'especialidade'],
    update: []
  },
  comentario: {
    create: ['conteudo', 'entidadeId'],
    update: []
  },
  mobilidade: {
    create: ['latitude', 'longitude', 'descricao'],
    update: [],
    updateStatus: ['status']
  },
  motorista: {
    create: ['nome', 'email', 'telefone'],
    update: []
  },
  veiculo: {
    create: ['placa', 'marca', 'modelo', 'cor', 'motoristaId'],
    update: []
  },
  manutencao: {
    create: ['nome', 'telefone', 'email', 'especialidades', 'endereco'],
    update: []
  },
  acessibilidadeUrbana: {
    create: ['nome', 'telefone', 'email', 'categoria', 'endereco'],
    update: []
  },
  auth: {
    login: ['email', 'senha']
  }
} as const
