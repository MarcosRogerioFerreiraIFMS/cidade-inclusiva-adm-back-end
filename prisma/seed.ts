/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Iniciar transação
  await prisma.$transaction(async (tx: any) => {
    // 1. Endereços
    await tx.endereco.deleteMany()
    await tx.endereco.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        rua: `Avenida Paulista`,
        numero: `${1000 + i}`,
        bairro: `Bela Vista`,
        cep: `01310-000`,
        estado: 'SP'
      }))
    })
    const enderecos = await tx.endereco.findMany()

    // 2. Usuários
    await tx.usuario.deleteMany()
    await tx.usuario.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `José da Silva ${i + 1}`,
        telefone: `1198765432${i}`,
        foto: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
        email: `jose.silva${i + 1}@example.com`,
        senha: `senha123${i + 1}`
      }))
    })
    const usuarios = await tx.usuario.findMany()

    // 3. Motoristas
    await tx.motorista.deleteMany()
    await tx.motorista.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `Maria Souza ${i + 1}`,
        telefone: `1199876543${i}`,
        email: `maria.souza${i + 1}@example.com`,
        foto: `https://randomuser.me/api/portraits/women/${i + 1}.jpg`
      }))
    })
    const motoristas = await tx.motorista.findMany()

    // 4. Veículos (referenciam Motorista)
    await tx.veiculo.deleteMany()
    await tx.veiculo.createMany({
      data: motoristas.map((m: any, i: any) => ({
        placa: `ABC1D3${i}`,
        marca: `Fiat`,
        modelo: `Uno`,
        motoristaId: m.id
      }))
    })

    // 5. Comentários (referenciam Usuário)
    await tx.comentario.deleteMany()
    await tx.comentario.createMany({
      data: usuarios.map((u: any) => ({
        like: Math.floor(Math.random() * 100),
        comentario: `Amei a iniciativa!`,
        usuarioId: u.id
      }))
    })

    // 6. CategoriaNoticia
    await tx.categoriaNoticia.deleteMany()
    await tx.categoriaNoticia.createMany({
      data: Array.from({ length: 3 }).map((_, i) => ({
        nome: [`Mobilidade Urbana`, `Acessibilidade`, `Eventos Inclusivos`][i]
      }))
    })
    const categoriasNoticia = await tx.categoriaNoticia.findMany()

    // 7. Notícias (referenciam CategoriaNoticia)
    await tx.noticia.deleteMany()
    await tx.noticia.createMany({
      data: categoriasNoticia.map((c: any) => ({
        titulo: `Nova rampa de acesso na Av. Paulista`,
        conteudo: `Instalação de rampa facilita acesso de cadeirantes.`,
        url: `https://www.cidadeinclusiva.com.br/noticias/`,
        foto: `https://source.unsplash.com/random`,
        categoriaId: c.id
      }))
    })

    // 8. CategoriaProfissional
    await tx.categoriaProfissional.deleteMany()
    await tx.categoriaProfissional.createMany({
      data: Array.from({ length: 3 }).map((_, i) => ({
        nome: [`Advogado`, `Psicólogo`, `Terapeuta Ocupacional`][i]
      }))
    })
    const categoriasProfissional = await tx.categoriaProfissional.findMany()

    // 9. Profissionais (referenciam CategoriaProfissional)
    await tx.profissional.deleteMany()
    await tx.profissional.createMany({
      data: categoriasProfissional.map((c: any, i: any) => ({
        nome: `Ana Paula ${i + 1}`,
        foto: `https://randomuser.me/api/portraits/women/${i + 10}.jpg`,
        telefone: `1197777666${i}`,
        email: `ana.paula${i + 1}@example.com`,
        categoriaId: c.id
      }))
    })

    // 10. CategoriaAcessibilidade
    await tx.categoriaAcessibilidade.deleteMany()
    await tx.categoriaAcessibilidade.createMany({
      data: Array.from({ length: 3 }).map((_, i) => ({
        nome: [`Rampas`, `Elevadores`, `Sinalização Tátil`][i]
      }))
    })
    const categoriasAcessibilidade = await tx.categoriaAcessibilidade.findMany()

    // 11. Acessibilidades (referenciam CategoriaAcessibilidade e Endereco)
    await tx.acessibilidade.deleteMany()
    await tx.acessibilidade.createMany({
      data: categoriasAcessibilidade.map((cat: any, i: any) => ({
        nome: `Rampa de acesso`,
        foto: `https://source.unsplash.com/random`,
        telefone: `1133334444`,
        email: `contato@acessibilidade.com`,
        enderecoId: enderecos[i % enderecos.length].id,
        categoriaId: cat.id
      }))
    })

    // 12. Especialidades
    await tx.especialidade.deleteMany()
    await tx.especialidade.createMany({
      data: Array.from({ length: 3 }).map((_, i) => ({
        descricao: [`Elétrica`, `Hidráulica`, `Pintura`][i]
      }))
    })
    const especialidades = await tx.especialidade.findMany()

    // 13. Serviços de Manutenção (referenciam Endereco, podem ter várias Especialidades)
    await tx.servicoManutencao.deleteMany()
    // Criar um serviço por especialidade, referenciando o mesmo endereço (ex: i mod length)
    for (let i = 0; i < 3; i++) {
      await tx.servicoManutencao.create({
        data: {
          nome: `Manutenção ${i + 1}`,
          telefone: `1122223333`,
          email: `servico@manutencao.com`,
          logo: `https://source.unsplash.com/random`,
          foto: `https://source.unsplash.com/random`,
          enderecoId: enderecos[i % enderecos.length].id,
          especialidades: { connect: [{ id: especialidades[i].id }] }
        }
      })
    }

    // 14. Mobilidades (referenciam Usuario e Endereco)
    await tx.mobilidade.deleteMany()
    await tx.mobilidade.createMany({
      data: Array.from({ length: 3 }).map((_, i) => ({
        latitude: Number(`-23.550520`),
        longitude: Number(`-46.633309`),
        ocorrencia: `Buraco na calçada`,
        status: 'PENDENTE',
        usuarioId: usuarios[i % usuarios.length].id,
        enderecoId: enderecos[i % enderecos.length].id
      }))
    })

    // 15. Recursos
    await tx.recurso.deleteMany()
    await tx.recurso.createMany({
      data: Array.from({ length: 3 }).map(() => ({
        acessibilidade: `Rampa`,
        descricao: `Rampa de acesso para cadeirantes`
      }))
    })

    // 16. Regras de Validação
    await tx.regraValidacao.deleteMany()
    await tx.regraValidacao.createMany({
      data: Array.from({ length: 3 }).map(() => ({
        campo: `nome`,
        tipo: `string`
      }))
    })
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
