import { fakerPT_BR as faker } from '@faker-js/faker'
import {
  CategoriaNoticia,
  EspecialidadeProfissional,
  PrismaClient
} from '@prisma/client'
import api from 'brasilapi-js'
import { hashPassword } from '../src/utils/passwordUtils'

// Configurar seed para garantir resultados reproduzíveis
faker.seed(123)

// Definir uma data de referência fixa para resultados consistentes
faker.setDefaultRefDate('2025-01-01T00:00:00.000Z')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // Limpar dados existentes na ordem correta (respeitando foreign keys)
    console.log('🧹 Limpando dados existentes...')
    await prisma.like.deleteMany()
    await prisma.comentario.deleteMany()
    await prisma.endereco.deleteMany()
    await prisma.usuario.deleteMany()
    await prisma.profissional.deleteMany()
    await prisma.noticia.deleteMany()

    console.log('✅ Dados existentes removidos com sucesso!')

    // Criar usuários com endereços (relação 1:1)
    console.log('👤 Criando usuários com endereços...')

    const validDDDs = [
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '21',
      '22',
      '24',
      '27',
      '28',
      '31',
      '32',
      '33',
      '34',
      '35',
      '37',
      '38',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '51',
      '53',
      '54',
      '55',
      '61',
      '62',
      '63',
      '64',
      '65',
      '66',
      '67',
      '68',
      '69',
      '71',
      '73',
      '74',
      '75',
      '77',
      '79',
      '81',
      '82',
      '83',
      '84',
      '85',
      '86',
      '87',
      '88',
      '89',
      '91',
      '92',
      '93',
      '94',
      '95',
      '96',
      '97',
      '98',
      '99'
    ]

    // Cache de CEPs reais para melhorar performance
    const realCEPsCache: Array<{
      cep: string
      logradouro: string
      bairro: string
      cidade: string
      estado: string
    }> = []

    // Função para buscar CEPs reais de capitais brasileiras
    const fetchRealCEPs = async (): Promise<void> => {
      console.log('🔍 Buscando CEPs reais das principais cidades...')

      // CEPs conhecidos de locais importantes (reduzido para ser mais rápido)
      const knownCEPs = [
        '01310-100', // Av. Paulista, São Paulo - SP
        '20040-020', // Centro, Rio de Janeiro - RJ
        '30130-000', // Centro, Belo Horizonte - MG
        '70040-010', // Asa Norte, Brasília - DF
        '80010-000' // Centro, Curitiba - PR
      ]

      for (const cep of knownCEPs) {
        try {
          const response = await api.cep.getBy(cep.replace('-', ''))

          if (response && response.data) {
            const cepData = response.data
            // Formatar CEP com hífen se não tiver
            const formattedCep = cepData.cep
              ? cepData.cep.replace(/(\d{5})(\d{3})/, '$1-$2')
              : cep

            realCEPsCache.push({
              cep: formattedCep,
              logradouro: cepData.street || faker.location.streetAddress(),
              bairro:
                cepData.neighborhood ||
                faker.location.state({ abbreviated: false }),
              cidade: cepData.city || faker.location.city(),
              estado:
                cepData.state || faker.location.state({ abbreviated: true })
            })

            // Delay pequeno entre requisições
            await new Promise((resolve) => setTimeout(resolve, 50))
          }
        } catch {
          console.warn(`⚠️ Erro ao buscar CEP ${cep}`)
          // Fallback para dados gerados com CEP válido
          realCEPsCache.push({
            cep: cep,
            logradouro: faker.location.streetAddress(),
            bairro: faker.location.state({ abbreviated: false }),
            cidade: faker.location.city(),
            estado: faker.location.state({ abbreviated: true })
          })
        }
      }

      console.log(`✅ ${realCEPsCache.length} CEPs carregados!`)

      // Log de quais são reais vs fallback
      const reais = realCEPsCache.filter(
        (c) => c.logradouro.includes('Avenida') || c.logradouro.includes('Rua')
      ).length
      const fallbacks = realCEPsCache.length - reais
      if (reais > 0) {
        console.log(
          `📍 ${reais} CEPs reais obtidos da API, ${fallbacks} fallbacks gerados`
        )
      }
    }

    // Buscar CEPs reais antes de gerar usuários
    await fetchRealCEPs()

    // Gera número de celular válido (9 dígitos, começa com 9)
    const generateValidPhoneNumber = (): string => {
      const ddd = faker.helpers.arrayElement(validDDDs)
      const numero = '9' + faker.string.numeric(8)
      return `${ddd}${numero}`
    }

    // Função para obter um endereço com CEP real
    const getRandomRealAddress = () => {
      if (realCEPsCache.length === 0) {
        // Fallback se não tiver CEPs reais
        return {
          logradouro: faker.location.streetAddress(),
          numero: faker.location.buildingNumber(),
          complemento:
            faker.helpers.maybe(() => faker.location.secondaryAddress()) ||
            null,
          cidade: faker.location.city(),
          bairro: faker.location.state({ abbreviated: false }),
          cep: faker.string.numeric(5) + '-' + faker.string.numeric(3),
          estado: faker.location.state({ abbreviated: true })
        }
      }

      const realAddress = faker.helpers.arrayElement(realCEPsCache)

      return {
        logradouro: realAddress.logradouro,
        numero: faker.location.buildingNumber(),
        complemento:
          faker.helpers.maybe(() => faker.location.secondaryAddress()) || null,
        cidade: realAddress.cidade,
        bairro: realAddress.bairro,
        cep: realAddress.cep,
        estado: realAddress.estado
      }
    }

    // Função para gerar usuário com dados realistas
    const generateUser = (existingEmails: Set<string>) => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()

      // Gerar email único
      let email: string
      let attempts = 0
      do {
        email = faker.internet.email({ firstName, lastName })
        attempts++
        // Se após 10 tentativas ainda não for único, adicionar timestamp
        if (attempts > 10) {
          email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${Date.now()}@email.com`
          break
        }
      } while (existingEmails.has(email))

      existingEmails.add(email)
      const endereco = getRandomRealAddress()

      return {
        nome: `${firstName} ${lastName}`,
        telefone: generateValidPhoneNumber(),
        foto: faker.image.avatar(),
        email,
        senha: faker.internet.password({ length: 8 }),
        endereco
      }
    }

    // Gerar 25 usuários com dados variados e emails únicos
    const existingEmails = new Set<string>()
    const usuariosData = []
    for (let i = 0; i < 25; i++) {
      usuariosData.push(generateUser(existingEmails))
    }

    const usuarios = []
    for (let i = 0; i < usuariosData.length; i++) {
      const usuarioData = usuariosData[i]
      const hashedPassword = await hashPassword(usuarioData.senha)

      // Escalonar datas de criação dos usuários ao longo dos últimos 3 meses
      const dataCriacao = faker.date.past({ years: 0.25 })

      const usuario = await prisma.usuario.create({
        data: {
          nome: usuarioData.nome,
          telefone: usuarioData.telefone,
          foto: usuarioData.foto,
          email: usuarioData.email,
          senha: hashedPassword,
          criadoEm: dataCriacao,
          atualizadoEm: dataCriacao,
          endereco: {
            create: {
              ...usuarioData.endereco,
              criadoEm: dataCriacao,
              atualizadoEm: dataCriacao
            }
          }
        },
        include: {
          endereco: true
        }
      })

      usuarios.push(usuario)
    }
    console.log(`✅ ${usuarios.length} usuários criados!`)

    // Criar profissionais
    console.log('👥 Criando profissionais...')

    // Função para gerar profissional com dados realistas
    const generateProfissional = (existingEmails: Set<string>) => {
      const sexo = faker.person.sexType()
      const firstName = faker.person.firstName(sexo)
      const lastName = faker.person.lastName()
      const especialidade = faker.helpers.arrayElement(
        Object.values(EspecialidadeProfissional)
      )

      // Gerar email único
      let email: string
      let attempts = 0
      do {
        email = faker.internet.email({ firstName, lastName })
        attempts++
        // Se após 10 tentativas ainda não for único, adicionar timestamp
        if (attempts > 10) {
          email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.prof.${Date.now()}@email.com`
          break
        }
      } while (existingEmails.has(email))

      existingEmails.add(email)

      // Adicionar prefixo baseado na especialidade
      let prefix = ''
      if (especialidade === 'MEDICO')
        prefix = sexo === 'male' ? 'Dr. ' : 'Dra. '
      else if (especialidade === 'ENFERMEIRO')
        prefix = sexo === 'male' ? 'Enf. ' : 'Enfª. '

      return {
        nome: `${prefix}${firstName} ${lastName}`,
        foto: faker.image.avatar(),
        telefone: generateValidPhoneNumber(),
        email,
        especialidade
      }
    }

    // Gerar 10 profissionais com dados variados e emails únicos
    const existingEmailsProfissionais = new Set<string>()
    // Adicionar emails já existentes dos usuários para evitar conflitos
    usuariosData.forEach((user) => existingEmailsProfissionais.add(user.email))

    const profissionaisData = []
    for (let i = 0; i < 10; i++) {
      profissionaisData.push(generateProfissional(existingEmailsProfissionais))
    }

    // Adicionar timestamps variados aos profissionais
    const profissionaisComTimestamps = profissionaisData.map((prof) => ({
      ...prof,
      criadoEm: faker.date.past({ years: 0.3 }),
      atualizadoEm: faker.date.recent({ days: 60 })
    }))

    const profissionais = await prisma.profissional.createMany({
      data: profissionaisComTimestamps
    })
    console.log(`✅ ${profissionais.count} profissionais criados!`)

    // Buscar os profissionais criados para usar seus IDs nos comentários
    const profissionaisCriados = await prisma.profissional.findMany()

    // Criar notícias com dados mais realistas e abrangentes
    console.log('📰 Criando notícias...')

    // Função para gerar notícia com dados realistas
    const generateNoticia = () => {
      const categoria = faker.helpers.arrayElement(
        Object.values(CategoriaNoticia)
      )

      // Gerar títulos e conteúdos baseados na categoria
      const getTituloEConteudo = (cat: CategoriaNoticia) => {
        const templates = {
          DIREITOS: {
            titulos: [
              'Nova legislação amplia direitos para pessoas com deficiência',
              'STF decide sobre isenção de impostos para PCD',
              'Aprovado projeto que garante novos benefícios inclusivos',
              'Ministério atualiza regras de acessibilidade obrigatória'
            ],
            conteudos: [
              'Uma nova lei federal foi aprovada expandindo os direitos fundamentais das pessoas com deficiência, incluindo maior acesso a serviços públicos e benefícios sociais.',
              'O Supremo Tribunal Federal tomou uma decisão importante sobre a isenção de impostos para pessoas com deficiência, beneficiando milhares de cidadãos.',
              'O Congresso Nacional aprovou um projeto de lei que garante novos benefícios e direitos para a população PCD brasileira.'
            ]
          },
          BENEFICIOS: {
            titulos: [
              'BPC aumenta valor para R$ 1.518 em 2025',
              'Novo programa de auxílio para pessoas com deficiência',
              'INSS anuncia facilidades para concessão de benefícios',
              'Cartão de desconto especial para PCD em farmácias'
            ],
            conteudos: [
              'O Benefício de Prestação Continuada teve seu valor atualizado seguindo o reajuste do salário mínimo, beneficiando milhares de pessoas.',
              'Um novo programa governamental oferece auxílio financeiro adicional para pessoas com deficiência em situação de vulnerabilidade.',
              'O INSS implementou novos procedimentos para facilitar e agilizar a concessão de benefícios para pessoas com deficiência.'
            ]
          },
          OPORTUNIDADES: {
            titulos: [
              'Empresa abre 200 vagas exclusivas para PCD',
              'Curso gratuito de capacitação profissional para PCD',
              'Programa de estágio em órgão público aceita inscrições',
              'Feira de empregos focada em inclusão acontece em SP'
            ],
            conteudos: [
              'Uma grande empresa do setor de tecnologia abriu um processo seletivo exclusivo para pessoas com deficiência, oferecendo oportunidades em diversas áreas.',
              'O SENAI está oferecendo cursos gratuitos de capacitação profissional especialmente desenvolvidos para pessoas com deficiência.',
              'Um programa de estágio em órgãos públicos está com inscrições abertas, com vagas reservadas para candidatos PCD.'
            ]
          },
          TECNOLOGIA: {
            titulos: [
              'App gratuito facilita navegação para pessoas cegas',
              'IA traduz libras em tempo real',
              'Nova tecnologia assistiva chega ao Brasil',
              'Startup desenvolve cadeira de rodas inteligente'
            ],
            conteudos: [
              'Um novo aplicativo gratuito utiliza inteligência artificial para ajudar pessoas com deficiência visual a navegar em espaços urbanos.',
              'Pesquisadores brasileiros desenvolveram um sistema de IA capaz de traduzir linguagem de sinais em tempo real.',
              'Uma nova tecnologia assistiva importada promete revolucionar o dia a dia de pessoas com deficiência no Brasil.'
            ]
          },
          SAUDE: {
            titulos: [
              'SUS amplia cobertura de órteses e próteses',
              'Novo centro de reabilitação é inaugurado',
              'Tratamento inovador para lesão medular',
              'Campanha de vacinação prioritária para PCD'
            ],
            conteudos: [
              'O Sistema Único de Saúde anunciou a ampliação da cobertura para órteses e próteses, incluindo novos dispositivos tecnológicos.',
              'Foi inaugurado um novo centro de reabilitação equipado com tecnologia de ponta para atendimento de pessoas com deficiência.',
              'Um tratamento inovador para lesão medular está sendo testado em hospitais brasileiros com resultados promissores.'
            ]
          },
          EDUCACAO: {
            titulos: [
              'MEC lança programa de educação inclusiva',
              'Universidade oferece bolsas para estudantes PCD',
              'Nova metodologia de ensino adaptado',
              'Projeto conecta escolas públicas com tecnologia assistiva'
            ],
            conteudos: [
              'O Ministério da Educação lançou um programa nacional de educação inclusiva para melhorar o atendimento a estudantes com deficiência.',
              'Uma renomada universidade brasileira está oferecendo bolsas de estudo integrais para estudantes com deficiência.',
              'Uma nova metodologia de ensino adaptado está sendo implementada em escolas públicas de todo o país.'
            ]
          },
          ESPORTE: {
            titulos: [
              'Brasil conquista medalhas nas Paralimpíadas',
              'Novo complexo esportivo adaptado é inaugurado',
              'Atleta paralímpico bate recorde mundial',
              'Projeto promove esporte inclusivo nas escolas'
            ],
            conteudos: [
              'A delegação brasileira nas Paralimpíadas conquistou resultados históricos, demonstrando a excelência do esporte paralímpico nacional.',
              'Foi inaugurado um novo complexo esportivo totalmente adaptado para a prática de esportes paralímpicos.',
              'Um atleta brasileiro quebrou o recorde mundial em sua modalidade, inspirando novos talentos no esporte paralímpico.'
            ]
          },
          ACESSIBILIDADE: {
            titulos: [
              'Cidade investe R$ 50 milhões em acessibilidade',
              'Novas regras de acessibilidade para edifícios',
              'Transporte público ganha melhorias inclusivas',
              'Shopping center se torna modelo de acessibilidade'
            ],
            conteudos: [
              'A prefeitura anunciou um investimento de R$ 50 milhões para melhorias de acessibilidade no transporte público e espaços urbanos.',
              'Novas regras de acessibilidade foram estabelecidas para garantir que todos os edifícios públicos sejam totalmente acessíveis.',
              'O sistema de transporte público da cidade recebeu importantes melhorias para garantir maior acessibilidade.'
            ]
          },
          TRABALHO: {
            titulos: [
              'Lei de cotas gera 15 mil empregos para PCD',
              'Empresa é premiada por inclusão no trabalho',
              'Home office facilita inserção de PCD no mercado',
              'Consultoria especializada em RH inclusivo cresce 200%'
            ],
            conteudos: [
              'A aplicação efetiva da lei de cotas resultou na criação de 15 mil novos empregos para pessoas com deficiência no último ano.',
              'Uma empresa nacional foi premiada como a mais inclusiva do país por suas práticas de contratação e desenvolvimento de profissionais PCD.',
              'O modelo de trabalho remoto tem facilitado a inserção de pessoas com deficiência no mercado de trabalho formal.'
            ]
          },
          CULTURA: {
            titulos: [
              'Festival de cinema inclusivo acontece em SP',
              'Museu lança tour virtual acessível',
              'Livro em braile ganha versão digital',
              'Teatro adapta peças para pessoas com deficiência'
            ],
            conteudos: [
              'Um festival de cinema com foco em acessibilidade e inclusão está acontecendo em São Paulo, exibindo filmes com audiodescrição e legendas.',
              'O museu lançou um tour virtual totalmente acessível, permitindo que pessoas com deficiência explorem as exposições de casa.',
              'Um clássico da literatura brasileira ganhou uma versão digital acessível, incluindo formato em braile e audiolivro.'
            ]
          },
          EVENTOS: {
            titulos: [
              'Congresso Nacional de Acessibilidade em BH',
              'Feira de tecnologia assistiva reúne inovações',
              'Workshop sobre inclusão no trabalho',
              'Seminário discute futuro da educação inclusiva'
            ],
            conteudos: [
              'O Congresso Nacional de Acessibilidade reunirá especialistas e profissionais para discutir os avanços na área de inclusão.',
              'Uma feira especializada em tecnologia assistiva apresentará as mais recentes inovações para pessoas com deficiência.',
              'Um workshop sobre inclusão no ambiente de trabalho está sendo realizado para capacitar gestores e RH de empresas.'
            ]
          },
          OUTROS: {
            titulos: [
              'Pesquisa revela avanços na inclusão social',
              'ONG lança campanha de conscientização',
              'Projeto voluntário arrecada fundos para PCD',
              'Iniciativa promove turismo acessível'
            ],
            conteudos: [
              'Uma pesquisa nacional revelou importantes avanços na inclusão social de pessoas com deficiência nos últimos cinco anos.',
              'Uma ONG lançou uma campanha nacional de conscientização sobre os direitos das pessoas com deficiência.',
              'Um projeto voluntário conseguiu arrecadar fundos significativos para apoiar famílias de pessoas com deficiência em situação de vulnerabilidade.'
            ]
          }
        }

        const categoryData = templates[cat]
        const titulo = faker.helpers.arrayElement(categoryData.titulos)
        const conteudo = faker.helpers.arrayElement(categoryData.conteudos)

        return { titulo, conteudo }
      }

      const { titulo, conteudo } = getTituloEConteudo(categoria)

      return {
        titulo,
        conteudo,
        categoria,
        url: faker.helpers.maybe(() => faker.internet.url()),
        foto: faker.image.url({ width: 800, height: 600 }),
        dataPublicacao: faker.date.past({ years: 0.5 }),
        criadoEm: faker.date.past({ years: 0.5 }),
        atualizadoEm: faker.date.recent({ days: 30 })
      }
    }

    // Gerar 15 notícias com dados variados
    const noticiasData = faker.helpers.multiple(generateNoticia, { count: 15 })

    const noticias = await prisma.noticia.createMany({
      data: noticiasData
    })
    console.log(`✅ ${noticias.count} notícias criadas!`)

    // Criar comentários dos usuários para os profissionais
    console.log('💬 Criando comentários...')

    // Função para gerar comentário realista com timestamp variado
    const generateComentario = (usuarioId: string, profissionalId: string) => {
      const comentariosTemplate = [
        'Excelente profissional! Muito atencioso e competente. Recomendo!',
        'Atendimento excepcional, sempre muito cuidadoso e prestativo.',
        'Profissional muito dedicado, fez toda a diferença no meu tratamento.',
        'Super recomendo! Muito humano e profissional ao mesmo tempo.',
        'Cuidado exemplar, sempre com muito carinho e atenção.',
        'Muito competente e experiente, me senti muito bem atendido.',
        'Profissional incrível! Superou todas as minhas expectativas.',
        'Atendimento de qualidade superior, muito satisfeito.',
        'Excelente trabalho, muito responsável e cuidadoso.',
        'Recomendo de olhos fechados, profissional nota 10!',
        'Muito atencioso e paciente, explicou tudo detalhadamente.',
        'Cuidado diferenciado, profissional muito qualificado.',
        'Trabalho excepcional, sempre muito profissional.',
        'Ótimo atendimento, me senti muito acolhido.',
        'Profissional muito competente e carinhoso.'
      ]

      // Gerar data aleatória dos últimos 6 meses
      const dataComentario = faker.date.past({ years: 0.5 })

      return {
        conteudo: faker.helpers.arrayElement(comentariosTemplate),
        usuarioId,
        profissionalId,
        criadoEm: dataComentario,
        atualizadoEm: dataComentario
      }
    }

    const comentarios = []

    // Criar entre 2-4 comentários para cada profissional
    for (const profissional of profissionaisCriados) {
      const numComentarios = faker.number.int({ min: 2, max: 4 })

      for (let i = 0; i < numComentarios; i++) {
        const usuarioAleatorio = faker.helpers.arrayElement(usuarios)
        const comentarioData = generateComentario(
          usuarioAleatorio.id,
          profissional.id
        )

        const comentario = await prisma.comentario.create({
          data: comentarioData
        })
        comentarios.push(comentario)
      }
    }
    console.log(`✅ ${comentarios.length} comentários criados!`)

    // Criar likes nos comentários
    console.log('👍 Criando likes nos comentários...')
    const likesData = []

    // Gerar likes aleatórios (cada usuário pode dar like em vários comentários, mas só uma vez por comentário)
    for (const comentario of comentarios) {
      // Cada comentário recebe entre 1-5 likes
      const numLikes = faker.number.int({ min: 1, max: 5 })
      const usuariosQueJaDeuramLike = new Set()

      for (
        let j = 0;
        j < numLikes && usuariosQueJaDeuramLike.size < usuarios.length;
        j++
      ) {
        let usuarioAleatorio
        do {
          usuarioAleatorio = faker.helpers.arrayElement(usuarios)
        } while (usuariosQueJaDeuramLike.has(usuarioAleatorio.id))

        usuariosQueJaDeuramLike.add(usuarioAleatorio.id)

        // Like deve ser posterior ao comentário
        const comentarioDate = new Date(comentario.criadoEm)
        const maxDate = new Date() // Data atual
        const dataLike = faker.date.between({
          from: comentarioDate,
          to: maxDate
        })

        likesData.push({
          usuarioId: usuarioAleatorio.id,
          comentarioId: comentario.id,
          criadoEm: dataLike
        })
      }
    }

    // Criar os likes em lotes para melhor performance
    for (const likeData of likesData) {
      await prisma.like.create({
        data: likeData
      })
    }
    console.log(`✅ ${likesData.length} likes criados!`)

    // Resumo final
    console.log('\n🎉 Seed concluído com sucesso!')
    console.log('📊 Resumo dos dados criados:')
    console.log(`   👤 Usuários: ${usuarios.length}`)
    console.log(`   🏠 Endereços: ${usuarios.length}`)
    console.log(`   👥 Profissionais: ${profissionais.count}`)
    console.log(`   📰 Notícias: ${noticias.count}`)
    console.log(`   💬 Comentários: ${comentarios.length}`)
    console.log(`   👍 Likes: ${likesData.length}`)
    console.log('\n✨ Banco de dados populado e pronto para uso!')
  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🔌 Conexão com o banco de dados encerrada.')
  })
