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
        rua: `Rua ${i + 1}`,
        numero: `${100 + i}`,
        bairro: `Bairro ${i + 1}`,
        cep: `00000-00${i}`,
        estado: 'Estado X'
      }))
    })
    const enderecos = await tx.endereco.findMany()

    // 2. Usuários
    await tx.usuario.deleteMany()
    await tx.usuario.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `Usuario ${i + 1}`,
        telefone: `99999-000${i}`,
        foto: `https://foto-usuario${i + 1}.jpg`,
        email: `usuario${i + 1}@teste.com`,
        senha: `senha${i + 1}`
      }))
    })
    const usuarios = await tx.usuario.findMany()

    // 3. Motoristas
    await tx.motorista.deleteMany()
    await tx.motorista.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `Motorista ${i + 1}`,
        telefone: `88888-000${i}`,
        email: `motorista${i + 1}@teste.com`,
        foto: `https://foto-motorista${i + 1}.jpg`
      }))
    })
    const motoristas = await tx.motorista.findMany()

    // 4. Veículos (referenciam Motorista)
    await tx.veiculo.deleteMany()
    await tx.veiculo.createMany({
      data: motoristas.map((m: any, i: any) => ({
        placa: `ABC-000${i}`,
        marca: `Marca ${i + 1}`,
        modelo: `Modelo ${i + 1}`,
        motoristaId: m.id
      }))
    })

    // 5. Comentários (referenciam Usuário)
    await tx.comentario.deleteMany()
    await tx.comentario.createMany({
      data: usuarios.map((u: any, i: any) => ({
        like: i,
        comentario: `Comentário ${i + 1}`,
        usuarioId: u.id
      }))
    })

    // 6. CategoriaNoticia
    await tx.categoriaNoticia.deleteMany()
    await tx.categoriaNoticia.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `CategoriaNoticia ${i + 1}`
      }))
    })
    const categoriasNoticia = await tx.categoriaNoticia.findMany()

    // 7. Notícias (referenciam CategoriaNoticia)
    await tx.noticia.deleteMany()
    await tx.noticia.createMany({
      data: categoriasNoticia.map((c: any, i: any) => ({
        titulo: `Notícia ${i + 1}`,
        conteudo: `Conteúdo da notícia ${i + 1}`,
        url: `https://noticia${i + 1}.com`,
        foto: `https://foto-noticia${i + 1}.jpg`,
        categoriaId: c.id
      }))
    })

    // 8. CategoriaProfissional
    await tx.categoriaProfissional.deleteMany()
    await tx.categoriaProfissional.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `CategoriaProfissional ${i + 1}`
      }))
    })
    const categoriasProfissional = await tx.categoriaProfissional.findMany()

    // 9. Profissionais (referenciam CategoriaProfissional)
    await tx.profissional.deleteMany()
    await tx.profissional.createMany({
      data: categoriasProfissional.map((c: any, i: any) => ({
        nome: `Profissional ${i + 1}`,
        foto: `https://foto-profissional${i + 1}.jpg`,
        telefone: `77777-000${i}`,
        email: `profissional${i + 1}@teste.com`,
        categoriaId: c.id
      }))
    })

    // 10. CategoriaAcessibilidade
    await tx.categoriaAcessibilidade.deleteMany()
    await tx.categoriaAcessibilidade.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        nome: `CategoriaAcess ${i + 1}`
      }))
    })
    const categoriasAcessibilidade = await tx.categoriaAcessibilidade.findMany()

    // 11. Acessibilidades (referenciam CategoriaAcessibilidade e Endereco)
    await tx.acessibilidade.deleteMany()
    await tx.acessibilidade.createMany({
      data: categoriasAcessibilidade.map((cat: any, i: any) => ({
        nome: `Acessibilidade ${i + 1}`,
        foto: `https://foto-acessibilidade${i + 1}.jpg`,
        telefone: `66666-000${i}`,
        email: `acess${i + 1}@teste.com`,
        enderecoId: enderecos[i % enderecos.length].id,
        categoriaId: cat.id
      }))
    })

    // 12. Especialidades
    await tx.especialidade.deleteMany()
    await tx.especialidade.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        descricao: `Especialidade ${i + 1}`
      }))
    })
    const especialidades = await tx.especialidade.findMany()

    // 13. Serviços de Manutenção (referenciam Endereco, podem ter várias Especialidades)
    await tx.servicoManutencao.deleteMany()
    // Criar um serviço por especialidade, referenciando o mesmo endereço (ex: i mod length)
    for (let i = 0; i < 10; i++) {
      await tx.servicoManutencao.create({
        data: {
          nome: `Servico ${i + 1}`,
          telefone: `55555-000${i}`,
          email: `manutencao${i + 1}@teste.com`,
          logo: `https://logo${i + 1}.jpg`,
          foto: `https://foto-servico${i + 1}.jpg`,
          enderecoId: enderecos[i % enderecos.length].id,
          especialidades: { connect: [{ id: especialidades[i].id }] }
        }
      })
    }

    // 14. Mobilidades (referenciam Usuario e Endereco)
    await tx.mobilidade.deleteMany()
    await tx.mobilidade.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        latitude: Number(`-23.${i + 1}1234`),
        longitude: Number(`-46.${i + 1}5678`),
        ocorrencia: `Ocorrência ${i + 1}`,
        status: 'Em aberto',
        usuarioId: usuarios[i % usuarios.length].id,
        enderecoId: enderecos[i % enderecos.length].id
      }))
    })

    // 15. Recursos
    await tx.recurso.deleteMany()
    await tx.recurso.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        acessibilidade: `Recurso Acess ${i + 1}`,
        descricao: `Descrição do recurso ${i + 1}`
      }))
    })

    // 16. Regras de Validação
    await tx.regraValidacao.deleteMany()
    await tx.regraValidacao.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        campo: `campo${i + 1}`,
        tipo: `tipo${i + 1}`
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
