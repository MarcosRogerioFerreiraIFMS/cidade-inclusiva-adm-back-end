/**
 * 🌱 SCRIPT DE SEED - CIDADE INCLUSIVA
 *
 * Este script popula o banco de dados com dados de teste para desenvolvimento.
 *
 * 🚨 PROTEÇÕES DE SEGURANÇA IMPLEMENTADAS:
 *
 * 1. 🛡️ Bloqueio por NODE_ENV:
 *    - Bloqueia execução se NODE_ENV === 'production' ou 'prod'
 *    - Permite apenas em 'development', 'test' ou undefined
 *
 * 2. 🔍 Verificação de URL suspeita:
 *    - Detecta padrões de produção na DATABASE_URL
 *    - Bloqueia se URL contém: prod, amazonaws, heroku, etc.
 *
 * 3. 📊 Verificação de volume de dados:
 *    - Conta registros existentes antes da limpeza
 *    - Bloqueia se >500 registros (exceto em NODE_ENV=development)
 *
 * 💡 Para executar com segurança:
 *    - Defina NODE_ENV=development
 *    - Use DATABASE_URL apontando para banco local/teste
 *    - Certifique-se de estar em ambiente de desenvolvimento
 *
 * ⚠️ ATENÇÃO: Este script REMOVE TODOS OS DADOS existentes!
 */

import { hashPassword } from '@/utils'
import { fakerPT_BR as faker } from '@faker-js/faker'
import {
  CategoriaNoticia,
  EspecialidadeProfissional,
  PrismaClient,
  StatusMobilidade,
  TipoUsuario
} from '@prisma/client'
import api from 'brasilapi-js'
import chalk from 'chalk'

/** Configurar seed para garantir resultados fixos */
faker.seed(123)

/** Definir uma data de referência fixa para resultados consistentes */
faker.setDefaultRefDate('2025-01-01T00:00:00.000Z')

/** Cliente Prisma para operações no banco de dados */
const prisma = new PrismaClient()

/**
 * Função principal do script de seed
 * Executa todas as operações de população do banco em sequência
 */
async function main() {
  // 🚨 PROTEÇÃO CONTRA EXECUÇÃO EM PRODUÇÃO
  const nodeEnv = process.env.NODE_ENV
  const isProduction = nodeEnv === 'production' || nodeEnv === 'prod'

  if (isProduction) {
    console.log(chalk.red.bold('🚨 ERRO: SEED BLOQUEADO EM PRODUÇÃO! 🚨'))
    console.log('')
    console.log(
      chalk.red(
        '❌ O script de seed não pode ser executado em ambiente de produção.'
      )
    )
    console.log(chalk.yellow('💡 Motivos de segurança:'))
    console.log(chalk.yellow('   • Remove todos os dados existentes do banco'))
    console.log(chalk.yellow('   • Popula com dados de teste/desenvolvimento'))
    console.log(chalk.yellow('   • Pode causar perda irreversível de dados'))
    console.log('')
    console.log(chalk.cyan('🔧 Para executar o seed:'))
    console.log(chalk.cyan('   • Defina NODE_ENV como "development" ou "test"'))
    console.log(chalk.cyan('   • Ou remova a variável NODE_ENV'))
    console.log('')
    console.log(
      chalk.gray(`Ambiente atual: ${chalk.white(nodeEnv || 'undefined')}`)
    )
    process.exit(1)
  }

  // Verificação adicional de URL do banco para extra segurança
  const databaseUrl = process.env.DATABASE_URL || ''
  const suspiciousPatterns = [
    'prod',
    'production',
    'live',
    'staging',
    'amazonaws.com',
    'digitalocean.com',
    'heroku.com',
    'railway.app',
    'vercel.com',
    'supabase.co',
    'planetscale.com'
  ]

  const hasSuspiciousPattern = suspiciousPatterns.some((pattern) =>
    databaseUrl.toLowerCase().includes(pattern)
  )

  if (hasSuspiciousPattern && nodeEnv !== 'development') {
    console.log(chalk.red.bold('🚨 AVISO: URL DE BANCO SUSPEITA DETECTADA! 🚨'))
    console.log('')
    console.log(chalk.red('❌ A URL do banco parece ser de produção/staging.'))
    console.log(chalk.yellow('🔍 URL detectada contém padrões de produção'))
    console.log(chalk.yellow('💡 Para forçar execução em desenvolvimento:'))
    console.log(chalk.yellow('   • Defina NODE_ENV=development'))
    console.log('')
    console.log(
      chalk.gray(
        `URL: ${chalk.white(databaseUrl.replace(/\/\/.*@/, '//***:***@'))}`
      )
    )
    process.exit(1)
  }

  console.log(chalk.green.bold('🌱 Iniciando seed do banco de dados...'))
  console.log(chalk.cyan('📝 Configurações:'))
  console.log(
    chalk.gray(`   • Ambiente: ${chalk.white(nodeEnv || 'development')}`)
  )
  console.log(
    chalk.gray(`   • Seed: ${chalk.white('123')} (resultados reproduzíveis)`)
  )
  console.log(
    chalk.gray(`   • Data de referência: ${chalk.white('2025-01-01')}`)
  )
  console.log('')

  try {
    // 🛡️ VERIFICAÇÃO FINAL ANTES DA LIMPEZA
    console.log(chalk.yellow.bold('🛡️  Verificação final de segurança...'))

    // Contar registros existentes para detectar banco com dados importantes
    const existingCounts = {
      usuarios: await prisma.usuario.count(),
      profissionais: await prisma.profissional.count(),
      noticias: await prisma.noticia.count(),
      mobilidades: await prisma.mobilidade.count(),
      comentarios: await prisma.comentario.count(),
      manutencoes: await prisma.manutencao.count()
    }

    const totalRecords = Object.values(existingCounts).reduce(
      (sum, count) => sum + count,
      0
    )

    if (totalRecords > 500 && nodeEnv !== 'development') {
      console.log(chalk.red.bold('🚨 ALTO VOLUME DE DADOS DETECTADO! 🚨'))
      console.log('')
      console.log(
        chalk.red(
          `❌ Banco contém ${totalRecords} registros. Muito alto para um ambiente de teste!`
        )
      )
      console.log(chalk.yellow('📊 Distribuição dos dados:'))
      Object.entries(existingCounts).forEach(([table, count]) => {
        if (count > 0) {
          console.log(chalk.yellow(`   • ${table}: ${count} registros`))
        }
      })
      console.log('')
      console.log(chalk.cyan('💡 Para forçar execução:'))
      console.log(chalk.cyan('   • Defina NODE_ENV=development'))
      console.log(
        chalk.cyan(
          '   • Certifique-se de que este é realmente um ambiente de desenvolvimento'
        )
      )
      process.exit(1)
    }

    if (totalRecords > 0) {
      console.log(
        chalk.gray(
          `   • Banco contém ${totalRecords} registros que serão removidos`
        )
      )
    } else {
      console.log(chalk.gray('   • Banco vazio, pronto para popular'))
    }

    // Limpar dados existentes na ordem correta (respeitando foreign keys)
    console.log(chalk.yellow.bold('🧹 Limpando dados existentes...'))

    const startTime = Date.now()

    console.log(chalk.gray('   • Removendo mobilidades...'))
    await prisma.mobilidade.deleteMany()

    console.log(chalk.gray('   • Removendo likes...'))
    await prisma.like.deleteMany()

    console.log(chalk.gray('   • Removendo comentários...'))
    await prisma.comentario.deleteMany()

    console.log(chalk.gray('   • Removendo veículos...'))
    await prisma.veiculo.deleteMany()

    console.log(chalk.gray('   • Removendo motoristas...'))
    await prisma.motorista.deleteMany()

    console.log(chalk.gray('   • Removendo especialidades de manutenção...'))
    await prisma.especialidadeManutencao.deleteMany()

    console.log(chalk.gray('   • Removendo manutenções...'))
    await prisma.manutencao.deleteMany()

    console.log(chalk.gray('   • Removendo endereços...'))
    await prisma.endereco.deleteMany()

    console.log(chalk.gray('   • Removendo usuários...'))
    await prisma.usuario.deleteMany()

    console.log(chalk.gray('   • Removendo profissionais...'))
    await prisma.profissional.deleteMany()

    console.log(chalk.gray('   • Removendo notícias...'))
    await prisma.noticia.deleteMany()

    const cleanupTime = Date.now() - startTime
    console.log(
      chalk.green(
        `✅ Dados existentes removidos com sucesso! ${chalk.gray(
          `(${cleanupTime}ms)`
        )}`
      )
    )
    console.log('')

    // Criar usuários com endereços (relação 1:1)
    console.log(chalk.blue.bold('👤 Criando usuários com endereços...'))
    console.log(chalk.gray('   • Preparando dados de localização...'))

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
      console.log(
        chalk.cyan('🔍 Buscando CEPs reais das principais cidades...')
      )

      // CEPs conhecidos de locais importantes (reduzido para ser mais rápido)
      const knownCEPs = [
        '01310-100', // Av. Paulista, São Paulo - SP
        '20040-020', // Centro, Rio de Janeiro - RJ
        '30130-000', // Centro, Belo Horizonte - MG
        '70040-010', // Asa Norte, Brasília - DF
        '80010-000' // Centro, Curitiba - PR
      ]

      let successCount = 0
      let fallbackCount = 0

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

            console.log(
              chalk.gray(
                `   • ${chalk.green('✓')} CEP ${chalk.white(formattedCep)} - ${
                  cepData.city || 'N/A'
                }, ${cepData.state || 'N/A'}`
              )
            )
            successCount++

            // Delay pequeno entre requisições
            await new Promise((resolve) => setTimeout(resolve, 50))
          }
        } catch {
          console.log(
            chalk.gray(
              `   • ${chalk.yellow('⚠')} CEP ${chalk.white(
                cep
              )} - usando dados gerados`
            )
          )
          // Fallback para dados gerados com CEP válido
          realCEPsCache.push({
            cep: cep,
            logradouro: faker.location.streetAddress(),
            bairro: faker.location.state({ abbreviated: false }),
            cidade: faker.location.city(),
            estado: faker.location.state({ abbreviated: true })
          })
          fallbackCount++
        }
      }

      console.log(chalk.green(`✅ ${realCEPsCache.length} CEPs carregados!`))
      console.log(
        chalk.gray(`   • ${chalk.green(successCount)} CEPs reais da API`)
      )
      console.log(
        chalk.gray(`   • ${chalk.yellow(fallbackCount)} CEPs com dados gerados`)
      )
      console.log('')
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
        email = faker.internet.email({ firstName, lastName }).toLowerCase()
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
        tipo: TipoUsuario.USUARIO, // Usuários comuns por padrão
        endereco
      }
    }

    console.log(chalk.cyan('👤 Criando usuário administrador...'))
    const adminPassword = await hashPassword('admin123')
    const admin = await prisma.usuario.create({
      data: {
        nome: 'Administrador do Sistema',
        telefone: '(11) 99999-9999',
        foto: {
          create: {
            url: 'https://i.pravatar.cc/400?img=admin'
          }
        },
        email: 'admin@cidadeinclusiva.com.br',
        senha: adminPassword,
        tipo: TipoUsuario.ADMIN,
        endereco: {
          create: {
            logradouro: 'Avenida Paulista - de 612 a 1510 - lado par',
            numero: '1042',
            complemento: 'Sala 1',
            cidade: 'São Paulo',
            bairro: 'Bela Vista',
            cep: '01310-100',
            estado: 'SP',
            pais: 'Brasil'
          }
        }
      }
    })
    console.log(chalk.green(`   ✅ Admin criado: ${admin.email}`))
    console.log('')

    console.log(chalk.cyan('👥 Gerando dados de usuários...'))
    // Gerar 25 usuários com dados variados e emails únicos
    const existingEmails = new Set<string>()
    existingEmails.add('admin@cidadeinclusiva.com.br') // Evitar duplicar email do admin
    const usuariosData = []
    for (let i = 0; i < 25; i++) {
      usuariosData.push(generateUser(existingEmails))
    }

    console.log(chalk.cyan('💾 Salvando usuários no banco de dados...'))
    const usuarios: Array<{ id: string; nome: string; email: string }> = []
    const startUserCreation = Date.now()

    for (let i = 0; i < usuariosData.length; i++) {
      const usuarioData = usuariosData[i]
      const hashedPassword = await hashPassword(usuarioData.senha)

      // Escalonar datas de criação dos usuários ao longo dos últimos 3 meses
      const dataCriacao = faker.date.past({ years: 0.25 })

      const usuario = await prisma.usuario.create({
        data: {
          nome: usuarioData.nome,
          telefone: usuarioData.telefone,
          foto: {
            create: {
              url: usuarioData.foto
            }
          },
          email: usuarioData.email,
          senha: hashedPassword,
          tipo: usuarioData.tipo,
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

      // Log de progresso a cada 5 usuários
      if ((i + 1) % 5 === 0 || i === usuariosData.length - 1) {
        console.log(
          chalk.gray(`   • ${i + 1}/${usuariosData.length} usuários criados`)
        )
      }
    }

    const userCreationTime = Date.now() - startUserCreation
    console.log(
      chalk.green(
        `✅ ${usuarios.length} usuários criados com sucesso! ${chalk.gray(
          `(${userCreationTime}ms)`
        )}`
      )
    )
    console.log('')

    // Criar mobilidades
    console.log(chalk.blue.bold('🚀 Criando mobilidades...'))
    console.log(chalk.cyan('📍 Gerando dados de mobilidade urbana...'))

    // Função para gerar mobilidade com dados realistas
    const generateMobilidade = (usuario?: { id: string }) => {
      const status = faker.helpers.arrayElement(Object.values(StatusMobilidade))

      // Descrições realistas baseadas em problemas comuns de mobilidade urbana
      const descricoesTemplate = [
        'Calçada com degrau muito alto, impossível para cadeirantes',
        'Rampa de acesso danificada, precisa de reparo urgente',
        'Falta de piso tátil na travessia da rua principal',
        'Semáforo sem sinal sonoro para pessoas com deficiência visual',
        'Ponto de ônibus sem abrigo e com meio-fio muito alto',
        'Elevador do metrô quebrado há mais de uma semana',
        'Buraco grande na calçada, perigoso para quem usa bengala',
        'Vaga de deficiente sempre ocupada por carros sem placa',
        'Escada do prédio público sem corrimão adequado',
        'Porta giratória muito pesada, difícil de usar',
        'Banheiro público sem acessibilidade para cadeirantes',
        'Obstáculo permanente bloqueando a rampa de acesso',
        'Sinalização em braile desgastada e ilegível',
        'Transporte público sem espaço para cadeira de rodas',
        'Calçada muito estreita, não passa cadeira de rodas',
        'Falta de iluminação adequada no local de travessia',
        'Piso irregular e escorregadio quando chove',
        'Telefone público muito alto para pessoas em cadeiras',
        'Plataforma do trem com vão muito grande',
        'Corrimão da rampa solto e perigoso'
      ]

      // Coordenadas de algumas cidades brasileiras importantes
      const coordenadasCidades = [
        { lat: -23.5505, lng: -46.6333, cidade: 'São Paulo - SP' },
        { lat: -22.9068, lng: -43.1729, cidade: 'Rio de Janeiro - RJ' },
        { lat: -19.9191, lng: -43.9386, cidade: 'Belo Horizonte - MG' },
        { lat: -15.7942, lng: -47.8822, cidade: 'Brasília - DF' },
        { lat: -25.4284, lng: -49.2733, cidade: 'Curitiba - PR' },
        { lat: -12.9714, lng: -38.5014, cidade: 'Salvador - BA' },
        { lat: -8.0476, lng: -34.877, cidade: 'Recife - PE' },
        { lat: -3.7319, lng: -38.5267, cidade: 'Fortaleza - CE' },
        { lat: -30.0346, lng: -51.2177, cidade: 'Porto Alegre - RS' },
        { lat: -20.3155, lng: -40.3128, cidade: 'Vitória - ES' }
      ]

      const coordenada = faker.helpers.arrayElement(coordenadasCidades)

      // Adicionar uma pequena variação às coordenadas para simular locais específicos
      const latitude =
        coordenada.lat + faker.number.float({ min: -0.05, max: 0.05 })
      const longitude =
        coordenada.lng + faker.number.float({ min: -0.05, max: 0.05 })

      // Gerar data de registro realista
      const dataRegistro = faker.date.past({ years: 0.5 })

      return {
        latitude: Number(latitude.toFixed(6)),
        longitude: Number(longitude.toFixed(6)),
        descricao: faker.helpers.arrayElement(descricoesTemplate),
        dataRegistro,
        status,
        usuarioId: usuario?.id || null,
        criadoEm: dataRegistro,
        atualizadoEm:
          status !== StatusMobilidade.PENDENTE
            ? faker.date.between({ from: dataRegistro, to: new Date() })
            : dataRegistro
      }
    }

    const mobilidades = []
    const startMobilityCreation = Date.now()

    // Criar 30 mobilidades - algumas com usuário, outras anônimas
    for (let i = 0; i < 30; i++) {
      // 70% das mobilidades têm usuário associado, 30% são anônimas
      const usuarioAleatorio = faker.helpers.maybe(
        () => faker.helpers.arrayElement(usuarios),
        { probability: 0.7 }
      )

      const mobilidadeData = generateMobilidade(usuarioAleatorio)

      const mobilidade = await prisma.mobilidade.create({
        data: mobilidadeData
      })

      mobilidades.push(mobilidade)

      // Log de progresso a cada 10 mobilidades
      if ((i + 1) % 10 === 0 || i === 29) {
        console.log(chalk.gray(`   • ${i + 1}/30 mobilidades criadas`))
      }
    }

    const mobilityCreationTime = Date.now() - startMobilityCreation
    console.log(
      chalk.green(
        `✅ ${mobilidades.length} mobilidades criadas com sucesso! ${chalk.gray(
          `(${mobilityCreationTime}ms)`
        )}`
      )
    )

    // Mostrar estatísticas dos status
    const statusStats = mobilidades.reduce((acc, mobilidade) => {
      acc[mobilidade.status] = (acc[mobilidade.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log(chalk.gray('   • Status das mobilidades:'))
    Object.entries(statusStats).forEach(([status, count]) => {
      console.log(chalk.gray(`     - ${status}: ${count}`))
    })

    // Mostrar quantidade com e sem usuário
    const comUsuario = mobilidades.filter((m) => m.usuarioId).length
    const semUsuario = mobilidades.length - comUsuario
    console.log(chalk.gray('   • Distribuição:'))
    console.log(chalk.gray(`     - Com usuário: ${comUsuario}`))
    console.log(chalk.gray(`     - Anônimas: ${semUsuario}`))
    console.log('')

    // Criar profissionais
    console.log(chalk.blue.bold('👥 Criando profissionais...'))
    console.log(chalk.cyan('🎭 Gerando dados de profissionais...'))

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
        email = faker.internet.email({ firstName, lastName }).toLowerCase()
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

    console.log(chalk.cyan('💾 Salvando profissionais no banco de dados...'))

    // Adicionar timestamps variados aos profissionais
    const profissionaisComTimestamps = profissionaisData.map((prof) => ({
      ...prof,
      criadoEm: faker.date.past({ years: 0.3 }),
      atualizadoEm: faker.date.recent({ days: 60 })
    }))

    const startProfCreation = Date.now()
    // Não podemos usar createMany com relações, então criamos um por vez
    const profissionaisResult = []
    for (const profData of profissionaisComTimestamps) {
      const profissional = await prisma.profissional.create({
        data: {
          nome: profData.nome,
          foto: {
            create: {
              url: profData.foto
            }
          },
          telefone: profData.telefone,
          email: profData.email,
          especialidade: profData.especialidade,
          criadoEm: profData.criadoEm,
          atualizadoEm: profData.atualizadoEm
        }
      })
      profissionaisResult.push(profissional)
    }
    const profCreationTime = Date.now() - startProfCreation

    console.log(
      chalk.green(
        `✅ ${
          profissionaisResult.length
        } profissionais criados com sucesso! ${chalk.gray(
          `(${profCreationTime}ms)`
        )}`
      )
    )

    // Mostrar estatísticas das especialidades
    const especialidadeStats = profissionaisComTimestamps.reduce(
      (acc, prof) => {
        acc[prof.especialidade] = (acc[prof.especialidade] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    console.log(chalk.gray('   • Especialidades criadas:'))
    Object.entries(especialidadeStats).forEach(([esp, count]) => {
      console.log(chalk.gray(`     - ${esp}: ${count}`))
    })
    console.log('')

    // Buscar os profissionais criados para usar seus IDs nos comentários
    const profissionaisCriados = profissionaisResult

    // Criar notícias com dados mais realistas e abrangentes
    console.log(chalk.blue.bold('📰 Criando notícias...'))
    console.log(chalk.cyan('📝 Gerando conteúdo das notícias...'))

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

    console.log(chalk.cyan('💾 Salvando notícias no banco de dados...'))
    const startNewsCreation = Date.now()
    // Não podemos usar createMany com relações, então criamos uma por vez
    const noticiasResult = []
    for (const noticiaData of noticiasData) {
      const noticia = await prisma.noticia.create({
        data: {
          titulo: noticiaData.titulo,
          conteudo: noticiaData.conteudo,
          categoria: noticiaData.categoria,
          url: noticiaData.url,
          foto: noticiaData.foto
            ? {
                create: {
                  url: noticiaData.foto
                }
              }
            : undefined,
          dataPublicacao: noticiaData.dataPublicacao,
          criadoEm: noticiaData.criadoEm,
          atualizadoEm: noticiaData.atualizadoEm
        }
      })
      noticiasResult.push(noticia)
    }
    const newsCreationTime = Date.now() - startNewsCreation

    console.log(
      chalk.green(
        `✅ ${noticiasResult.length} notícias criadas com sucesso! ${chalk.gray(
          `(${newsCreationTime}ms)`
        )}`
      )
    )

    // Mostrar estatísticas das categorias
    const categoriaStats = noticiasData.reduce((acc, noticia) => {
      acc[noticia.categoria] = (acc[noticia.categoria] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log(chalk.gray('   • Categorias criadas:'))
    Object.entries(categoriaStats).forEach(([cat, count]) => {
      console.log(chalk.gray(`     - ${cat}: ${count}`))
    })
    console.log('')

    // Criar comentários dos usuários para os profissionais
    console.log(chalk.blue.bold('💬 Criando comentários...'))
    console.log(chalk.cyan('📝 Gerando feedback dos usuários...'))

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
    const startCommentCreation = Date.now()

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

    const commentCreationTime = Date.now() - startCommentCreation
    console.log(
      chalk.green(
        `✅ ${comentarios.length} comentários criados com sucesso! ${chalk.gray(
          `(${commentCreationTime}ms)`
        )}`
      )
    )
    console.log(
      chalk.gray(
        `   • Média de ${(
          comentarios.length / profissionaisCriados.length
        ).toFixed(1)} comentários por profissional`
      )
    )
    console.log('')

    // Criar likes nos comentários
    console.log(chalk.blue.bold('👍 Criando likes nos comentários...'))
    console.log(chalk.cyan('❤️  Gerando interações dos usuários...'))
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
    const startLikeCreation = Date.now()
    for (const likeData of likesData) {
      await prisma.like.create({
        data: likeData
      })
    }
    const likeCreationTime = Date.now() - startLikeCreation

    console.log(
      chalk.green(
        `✅ ${likesData.length} likes criados com sucesso! ${chalk.gray(
          `(${likeCreationTime}ms)`
        )}`
      )
    )
    console.log(
      chalk.gray(
        `   • Média de ${(likesData.length / comentarios.length).toFixed(
          1
        )} likes por comentário`
      )
    )
    console.log('')

    // Criar empresas de manutenção
    console.log(chalk.blue.bold('🔧 Criando empresas de manutenção...'))
    console.log(chalk.cyan('🏢 Gerando dados de manutenção...'))

    // Função para gerar empresa de manutenção com dados realistas
    const generateManutencao = (existingEmails: Set<string>) => {
      const tiposEmpresa = [
        'Oficina',
        'Auto Center',
        'Mecânica',
        'Serviços Automotivos',
        'Centro Automotivo',
        'Garage',
        'Auto Service'
      ]

      const nomes = [
        'Boa Viagem',
        'Confiança',
        'Rápido',
        'Expert',
        'Premium',
        'Central',
        'União',
        'Nova Era',
        'Progresso',
        'Futuro',
        'Master',
        'Top',
        'Elite',
        'Super',
        'Mega'
      ]

      const tipoEmpresa = faker.helpers.arrayElement(tiposEmpresa)
      const nomeEmpresa = faker.helpers.arrayElement(nomes)
      const nomeCompleto = `${tipoEmpresa} ${nomeEmpresa}`

      // Gerar email único baseado no nome da empresa
      let email: string
      let attempts = 0
      const emailBase = nomeCompleto.toLowerCase().replace(/\s+/g, '')
      do {
        email =
          attempts === 0
            ? `contato@${emailBase}.com.br`
            : `contato${attempts}@${emailBase}.com.br`
        attempts++
        if (attempts > 10) {
          email = `manutencao.${Date.now()}@empresa.com.br`
          break
        }
      } while (existingEmails.has(email))

      existingEmails.add(email)

      // Especialidades possíveis para manutenção automotiva
      const especialidadesPossiveis = [
        'Freios',
        'Suspensão',
        'Motor',
        'Transmissão',
        'Sistema Elétrico',
        'Ar Condicionado',
        'Pneus e Rodas',
        'Escapamento',
        'Injeção Eletrônica',
        'Radiador',
        'Bateria',
        'Alinhamento e Balanceamento',
        'Troca de Óleo',
        'Revisão Geral',
        'Funilaria',
        'Pintura',
        'Vidros',
        'Sistema de Direção',
        'Embreagem',
        'Acessibilidade Veicular'
      ]

      // Cada empresa terá entre 3-8 especialidades
      const numEspecialidades = faker.number.int({ min: 3, max: 8 })
      const especialidades = faker.helpers.arrayElements(
        especialidadesPossiveis,
        numEspecialidades
      )

      const endereco = getRandomRealAddress()

      return {
        nome: nomeCompleto,
        telefone: generateValidPhoneNumber(),
        email,
        endereco,
        especialidades,
        logo: faker.image.urlLoremFlickr({
          category: 'business',
          width: 400,
          height: 400
        }),
        // Gerar entre 2-5 fotos da empresa
        fotos: Array.from(
          { length: faker.number.int({ min: 2, max: 5 }) },
          () =>
            faker.image.urlLoremFlickr({
              category: 'garage',
              width: 800,
              height: 600
            })
        ),
        criadoEm: faker.date.past({ years: 0.4 }),
        atualizadoEm: faker.date.recent({ days: 45 })
      }
    }

    // Gerar 6 empresas de manutenção com emails únicos
    const existingEmailsManutencao = new Set<string>()
    // Adicionar emails já existentes para evitar conflitos
    usuariosData.forEach((user) => existingEmailsManutencao.add(user.email))
    profissionaisComTimestamps.forEach((prof) =>
      existingEmailsManutencao.add(prof.email)
    )

    const manutencoesData = []
    for (let i = 0; i < 6; i++) {
      manutencoesData.push(generateManutencao(existingEmailsManutencao))
    }

    console.log(
      chalk.cyan('💾 Salvando empresas de manutenção no banco de dados...')
    )
    const startMaintenanceCreation = Date.now()

    const manutencoes = []
    for (const manutencaoData of manutencoesData) {
      const manutencao = await prisma.manutencao.create({
        data: {
          nome: manutencaoData.nome,
          telefone: manutencaoData.telefone,
          email: manutencaoData.email,
          endereco: {
            create: {
              ...manutencaoData.endereco,
              criadoEm: manutencaoData.criadoEm,
              atualizadoEm: manutencaoData.atualizadoEm
            }
          },
          logo: {
            create: {
              url: manutencaoData.logo
            }
          },
          fotos: {
            create: manutencaoData.fotos.map((url) => ({ url }))
          },
          especialidades: {
            create: manutencaoData.especialidades.map((nome) => ({
              nome,
              criadoEm: manutencaoData.criadoEm,
              atualizadoEm: manutencaoData.atualizadoEm
            }))
          },
          criadoEm: manutencaoData.criadoEm,
          atualizadoEm: manutencaoData.atualizadoEm
        }
      })
      manutencoes.push(manutencao)
    }

    const maintenanceCreationTime = Date.now() - startMaintenanceCreation
    console.log(
      chalk.green(
        `✅ ${
          manutencoes.length
        } empresas de manutenção criadas com sucesso! ${chalk.gray(
          `(${maintenanceCreationTime}ms)`
        )}`
      )
    )

    // Mostrar estatísticas das especialidades mais comuns
    const allEspecialidades = manutencoesData.flatMap((m) => m.especialidades)
    const especialidadeManutencaoStats = allEspecialidades.reduce(
      (acc, esp) => {
        acc[esp] = (acc[esp] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    console.log(chalk.gray('   • Especialidades mais oferecidas:'))
    Object.entries(especialidadeManutencaoStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .forEach(([esp, count]) => {
        console.log(chalk.gray(`     - ${esp}: ${count} empresas`))
      })

    // Contar total de fotos e especialidades
    const totalEspecialidades = await prisma.especialidadeManutencao.count()
    const totalFotosManutencao = await prisma.foto.count({
      where: {
        OR: [
          { manutencaoId: { not: null } },
          { manutencaoLogoId: { not: null } }
        ]
      }
    })

    console.log(
      chalk.gray(`   • Total de especialidades: ${totalEspecialidades}`)
    )
    console.log(chalk.gray(`   • Total de fotos: ${totalFotosManutencao}`))
    console.log('')

    // Criar motoristas e veículos
    console.log(chalk.blue.bold('🚗 Criando motoristas e veículos...'))
    console.log(chalk.cyan('🚕 Gerando dados de transporte...'))

    // Função para gerar motorista com dados realistas
    const generateMotorista = (existingEmails: Set<string>) => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()

      // Gerar email único
      let email: string
      let attempts = 0
      do {
        email = faker.internet.email({ firstName, lastName }).toLowerCase()
        attempts++
        if (attempts > 10) {
          email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.driver.${Date.now()}@email.com`
          break
        }
      } while (existingEmails.has(email))

      existingEmails.add(email)

      return {
        nome: `${firstName} ${lastName}`,
        telefone: generateValidPhoneNumber(),
        email,
        foto: faker.image.avatar(),
        criadoEm: faker.date.past({ years: 0.3 }),
        atualizadoEm: faker.date.recent({ days: 30 })
      }
    }

    // Função para gerar veículo com dados realistas
    const generateVeiculo = (motoristaId: string) => {
      const marcas = [
        'Toyota',
        'Honda',
        'Volkswagen',
        'Chevrolet',
        'Ford',
        'Fiat',
        'Hyundai',
        'Nissan',
        'Renault',
        'Peugeot'
      ]
      const modelos = [
        'Corolla',
        'Civic',
        'Gol',
        'Onix',
        'Ka',
        'Uno',
        'HB20',
        'March',
        'Sandero',
        '208'
      ]
      const cores = [
        'Branco',
        'Prata',
        'Preto',
        'Azul',
        'Vermelho',
        'Cinza',
        'Bege',
        'Verde'
      ]

      // Gerar placa válida (formato antigo ou Mercosul)
      const isMercosul = faker.datatype.boolean()
      let placa: string

      if (isMercosul) {
        // Formato Mercosul: ABC1D23
        placa =
          faker.string.alpha({ length: 3, casing: 'upper' }) +
          faker.string.numeric(1) +
          faker.string.alpha({ length: 1, casing: 'upper' }) +
          faker.string.numeric(2)
      } else {
        // Formato antigo: ABC1234
        placa =
          faker.string.alpha({ length: 3, casing: 'upper' }) +
          faker.string.numeric(4)
      }

      const marca = faker.helpers.arrayElement(marcas)
      const modelo = faker.helpers.arrayElement(modelos)
      const cor = faker.helpers.arrayElement(cores)

      // Gerar entre 1-3 fotos para o veículo
      const numFotos = faker.number.int({ min: 1, max: 3 })
      const fotos = []
      for (let i = 0; i < numFotos; i++) {
        fotos.push(
          faker.image.urlLoremFlickr({
            category: 'car',
            width: 800,
            height: 600
          })
        )
      }

      return {
        placa,
        marca,
        modelo,
        cor,
        motoristaId,
        fotos,
        criadoEm: faker.date.past({ years: 0.3 }),
        atualizadoEm: faker.date.recent({ days: 30 })
      }
    }

    // Gerar 8 motoristas com emails únicos
    const existingEmailsMotoristas = new Set<string>()
    // Adicionar emails já existentes para evitar conflitos
    usuariosData.forEach((user) => existingEmailsMotoristas.add(user.email))
    profissionaisComTimestamps.forEach((prof) =>
      existingEmailsMotoristas.add(prof.email)
    )

    const motoristasData = []
    for (let i = 0; i < 8; i++) {
      motoristasData.push(generateMotorista(existingEmailsMotoristas))
    }

    console.log(chalk.cyan('💾 Salvando motoristas no banco de dados...'))
    const startDriverCreation = Date.now()

    const motoristas = []
    for (const motoristaData of motoristasData) {
      const motorista = await prisma.motorista.create({
        data: {
          nome: motoristaData.nome,
          telefone: motoristaData.telefone,
          email: motoristaData.email,
          foto: {
            create: {
              url: motoristaData.foto
            }
          },
          criadoEm: motoristaData.criadoEm,
          atualizadoEm: motoristaData.atualizadoEm
        }
      })
      motoristas.push(motorista)
    }

    const driverCreationTime = Date.now() - startDriverCreation
    console.log(
      chalk.green(
        `✅ ${motoristas.length} motoristas criados com sucesso! ${chalk.gray(
          `(${driverCreationTime}ms)`
        )}`
      )
    )

    console.log(chalk.cyan('🚙 Criando veículos para os motoristas...'))
    const startVehicleCreation = Date.now()

    const veiculos = []
    const placasUsadas = new Set<string>()

    for (const motorista of motoristas) {
      let veiculoData
      let placaUnica

      // Garantir que a placa seja única
      do {
        veiculoData = generateVeiculo(motorista.id)
        placaUnica = veiculoData.placa
      } while (placasUsadas.has(placaUnica))

      placasUsadas.add(placaUnica)

      const veiculo = await prisma.veiculo.create({
        data: {
          placa: veiculoData.placa,
          marca: veiculoData.marca,
          modelo: veiculoData.modelo,
          cor: veiculoData.cor,
          motorista: {
            connect: { id: veiculoData.motoristaId }
          },
          fotos: {
            create: veiculoData.fotos.map((url) => ({ url }))
          },
          criadoEm: veiculoData.criadoEm,
          atualizadoEm: veiculoData.atualizadoEm
        }
      })
      veiculos.push(veiculo)
    }

    const vehicleCreationTime = Date.now() - startVehicleCreation
    console.log(
      chalk.green(
        `✅ ${veiculos.length} veículos criados com sucesso! ${chalk.gray(
          `(${vehicleCreationTime}ms)`
        )}`
      )
    )

    // Mostrar estatísticas das marcas
    const marcaStats = veiculos.reduce((acc, veiculo) => {
      acc[veiculo.marca] = (acc[veiculo.marca] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log(chalk.gray('   • Marcas de veículos criadas:'))
    Object.entries(marcaStats).forEach(([marca, count]) => {
      console.log(chalk.gray(`     - ${marca}: ${count}`))
    })

    // Contar total de fotos de veículos
    const totalFotosVeiculos = await prisma.foto.count({
      where: { veiculoId: { not: null } }
    })

    console.log(
      chalk.gray(`   • Total de fotos de veículos: ${totalFotosVeiculos}`)
    )
    console.log('')

    // Resumo final
    const totalTime = Date.now() - startTime
    console.log('')
    console.log(chalk.green.bold('🎉 Seed concluído com sucesso!'))
    console.log(chalk.cyan.bold('📊 Resumo dos dados criados:'))
    console.log(
      chalk.white(
        `   👤 Usuários: ${chalk.green.bold(usuarios.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   🏠 Endereços: ${chalk.green.bold(
          (usuarios.length + manutencoes.length).toString()
        )}`
      )
    )
    console.log(
      chalk.white(
        `   👥 Profissionais: ${chalk.green.bold(
          profissionaisResult.length.toString()
        )}`
      )
    )
    console.log(
      chalk.white(
        `   📰 Notícias: ${chalk.green.bold(noticiasResult.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   💼 Mobilidades: ${chalk.green.bold(mobilidades.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   💬 Comentários: ${chalk.green.bold(comentarios.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   👍 Likes: ${chalk.green.bold(likesData.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   🔧 Manutenções: ${chalk.green.bold(manutencoes.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   🚗 Motoristas: ${chalk.green.bold(motoristas.length.toString())}`
      )
    )
    console.log(
      chalk.white(
        `   🚙 Veículos: ${chalk.green.bold(veiculos.length.toString())}`
      )
    )
    console.log('')
    console.log(
      chalk.green.bold(
        `⏱️  Tempo total: ${chalk.white((totalTime / 1000).toFixed(2))}s`
      )
    )
    console.log('')
    console.log(
      chalk.magenta.bold('✨ Banco de dados populado e pronto para uso! ✨')
    )
  } catch (error) {
    console.log('')
    console.log(chalk.red.bold('❌ Erro durante o seed:'))
    console.log(
      chalk.red(error instanceof Error ? error.message : String(error))
    )
    if (error instanceof Error && error.stack) {
      console.log(chalk.gray(error.stack))
    }
    throw error
  }
}

main()
  .catch((e) => {
    console.log('')
    console.log(chalk.red.bold('❌ ERRO FATAL NO SEED'))
    console.log(chalk.red('Falha crítica durante a execução do seed:'))
    console.log(chalk.red(e instanceof Error ? e.message : String(e)))
    if (e instanceof Error && e.stack) {
      console.log('')
      console.log(chalk.gray('Stack trace:'))
      console.log(chalk.gray(e.stack))
    }
    console.log('')
    console.log(chalk.yellow('💡 Dicas para resolver:'))
    console.log(chalk.yellow('   • Verifique se o banco de dados está rodando'))
    console.log(chalk.yellow('   • Execute: pnpm migrate'))
    console.log(chalk.yellow('   • Verifique as variáveis de ambiente'))
    console.log('')
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log(chalk.gray('🔌 Conexão com o banco de dados encerrada.'))
  })
