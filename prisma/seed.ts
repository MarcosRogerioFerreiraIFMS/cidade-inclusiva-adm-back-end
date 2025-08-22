import {
  CategoriaNoticia,
  EspecialidadeProfissional,
  PrismaClient
} from '@prisma/client'

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
    const usuariosData = [
      {
        nome: 'João Silva',
        telefone: '11999887766',
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        email: 'joao.silva@email.com',
        senha: 'senha123',
        endereco: {
          logradouro: 'Rua das Flores',
          numero: '123',
          complemento: 'Apt 45',
          cidade: 'São Paulo',
          bairro: 'Vila Madalena',
          cep: '05435-050',
          estado: 'SP'
        }
      },
      {
        nome: 'Maria Santos',
        telefone: '11988776655',
        foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
        email: 'maria.santos@email.com',
        senha: 'senha123',
        endereco: {
          logradouro: 'Avenida Paulista',
          numero: '1000',
          cidade: 'São Paulo',
          bairro: 'Bela Vista',
          cep: '01310-100',
          estado: 'SP'
        }
      },
      {
        nome: 'Pedro Oliveira',
        telefone: '11977665544',
        foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        email: 'pedro.oliveira@email.com',
        senha: 'senha123',
        endereco: {
          logradouro: 'Rua Oscar Freire',
          numero: '500',
          complemento: 'Casa',
          cidade: 'São Paulo',
          bairro: 'Jardins',
          cep: '01426-001',
          estado: 'SP'
        }
      },
      {
        nome: 'Ana Costa',
        telefone: '11966554433',
        foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        email: 'ana.costa@email.com',
        senha: 'senha123',
        endereco: {
          logradouro: 'Rua Augusta',
          numero: '750',
          cidade: 'São Paulo',
          bairro: 'Consolação',
          cep: '01305-100',
          estado: 'SP'
        }
      },
      {
        nome: 'Carlos Pereira',
        telefone: '11955443322',
        foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        email: 'carlos.pereira@email.com',
        senha: 'senha123',
        endereco: {
          logradouro: 'Avenida Ibirapuera',
          numero: '2000',
          complemento: 'Bloco B',
          cidade: 'São Paulo',
          bairro: 'Ibirapuera',
          cep: '04029-200',
          estado: 'SP'
        }
      }
    ]

    const usuarios = []
    for (const usuarioData of usuariosData) {
      const usuario = await prisma.usuario.create({
        data: {
          nome: usuarioData.nome,
          telefone: usuarioData.telefone,
          foto: usuarioData.foto,
          email: usuarioData.email,
          senha: usuarioData.senha,
          endereco: {
            create: usuarioData.endereco
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
    const profissionais = await prisma.profissional.createMany({
      data: [
        {
          nome: 'Dr. Ana Maria Santos',
          foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
          telefone: '11987654321',
          email: 'ana.santos@exemplo.com',
          especialidade: EspecialidadeProfissional.MEDICO
        },
        {
          nome: 'Maria José Silva',
          foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
          telefone: '11976543210',
          email: 'maria.silva@exemplo.com',
          especialidade: EspecialidadeProfissional.CUIDADOR
        },
        {
          nome: 'Dr. Carlos Oliveira',
          foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
          telefone: '11965432109',
          email: 'carlos.oliveira@exemplo.com',
          especialidade: EspecialidadeProfissional.FISIOTERAPEUTA
        },
        {
          nome: 'Dra. Beatriz Costa',
          foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
          telefone: '11954321098',
          email: 'beatriz.costa@exemplo.com',
          especialidade: EspecialidadeProfissional.PSICOLOGO
        },
        {
          nome: 'Enfª. Juliana Pereira',
          foto: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face',
          telefone: '11943210987',
          email: 'juliana.pereira@exemplo.com',
          especialidade: EspecialidadeProfissional.ENFERMEIRO
        },
        {
          nome: 'Rosa Aparecida Lima',
          foto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
          telefone: '11932109876',
          email: 'rosa.lima@exemplo.com',
          especialidade: EspecialidadeProfissional.SECRETARIO_DO_LAR
        }
      ]
    })
    console.log(`✅ ${profissionais.count} profissionais criados!`)

    // Buscar os profissionais criados para usar seus IDs nos comentários
    const profissionaisCriados = await prisma.profissional.findMany()

    // Criar notícias com dados mais realistas e abrangentes
    console.log('📰 Criando notícias...')
    const noticias = await prisma.noticia.createMany({
      data: [
        // DIREITOS
        {
          titulo:
            'STF analisa mudanças na legislação de isenção para veículos PCD',
          conteudo:
            'O Supremo Tribunal Federal está analisando uma ação que pode redefinir as regras de isenção de impostos para compra de veículos por pessoas com deficiência. A decisão pode impactar milhares de beneficiários em todo o país.',
          categoria: CategoriaNoticia.DIREITOS,
          url: 'https://www.terra.com.br/mobilidade/carro-com-isencao-para-pcd-stf-entra-na-discussao-e-pode-definir-novas-regras,4b003cb0fd9df721122d6cb3b57c1062l4x9yr3e.html',
          foto: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/07/08/carro-pcd-1ibjskggydg0y.jpg',
          dataPublicacao: new Date('2025-08-10T10:00:00.000Z')
        },

        // BENEFÍCIOS
        {
          titulo:
            'Chevrolet amplia descontos para PCD com redução de até R$ 42.000',
          conteudo:
            'A Chevrolet anunciou nova campanha de vendas para pessoas com deficiência com descontos significativos em diversos modelos, incluindo o Tracker Premier com desconto de R$ 41.995.',
          categoria: CategoriaNoticia.BENEFICIOS,
          url: 'https://mundodoautomovelparapcd.com.br/chevrolet-para-pcd-em-abril-de-2025/',
          foto: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-09T09:00:00.000Z')
        },
        {
          titulo:
            'BPC: Novo valor de R$ 1.518 já está sendo pago aos beneficiários',
          conteudo:
            'O Benefício de Prestação Continuada (BPC) teve seu valor atualizado para R$ 1.518, seguindo o reajuste do salário mínimo. O benefício é destinado a pessoas com deficiência e idosos em situação de vulnerabilidade.',
          categoria: CategoriaNoticia.BENEFICIOS,
          foto: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-07T11:00:00.000Z')
        },

        // OPORTUNIDADES
        {
          titulo:
            'Hospitais públicos do Pará abrem 150 vagas exclusivas para PCD',
          conteudo:
            'O Centro Integrado de Inclusão e Reabilitação (CIIR) e outros hospitais públicos do Pará estão com processos seletivos abertos oferecendo vagas exclusivas para pessoas com deficiência em diversas áreas da saúde.',
          categoria: CategoriaNoticia.OPORTUNIDADES,
          url: 'https://diariodopara.com.br/concursos-e-empregos/abertas-inscricoes-para-pcd-em-hospitais-publicos-do-para-confira-as-vagas/',
          foto: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-08T16:00:00.000Z')
        },
        {
          titulo:
            'Programa de capacitação profissional para PCD tem inscrições abertas',
          conteudo:
            'O SENAI está com inscrições abertas para cursos gratuitos de capacitação profissional voltados especificamente para pessoas com deficiência, oferecendo certificação em áreas como informática, administração e serviços.',
          categoria: CategoriaNoticia.OPORTUNIDADES,
          foto: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-06T08:30:00.000Z')
        },

        // TECNOLOGIA
        {
          titulo: 'IA brasileira traduz linguagem de sinais em tempo real',
          conteudo:
            'Pesquisadores da USP desenvolveram sistema de inteligência artificial capaz de traduzir Libras para português falado em tempo real, revolucionando a comunicação de pessoas surdas.',
          categoria: CategoriaNoticia.TECNOLOGIA,
          foto: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-07T15:45:00.000Z')
        },
        {
          titulo:
            'Aplicativo gratuito ajuda pessoas cegas a navegar em espaços urbanos',
          conteudo:
            'O app SoundScape da Microsoft, agora disponível gratuitamente, utiliza áudio 3D para ajudar pessoas com deficiência visual a se orientar em ambientes urbanos complexos.',
          categoria: CategoriaNoticia.TECNOLOGIA,
          foto: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-05T12:20:00.000Z')
        },

        // SAÚDE
        {
          titulo:
            'SUS amplia cobertura de órteses e próteses para pessoas com deficiência',
          conteudo:
            'O Ministério da Saúde anunciou a ampliação da cobertura do SUS para órteses e próteses, incluindo novos dispositivos tecnológicos que melhoram significativamente a qualidade de vida dos usuários.',
          categoria: CategoriaNoticia.SAUDE,
          foto: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-09T13:15:00.000Z')
        },

        // EDUCAÇÃO
        {
          titulo:
            'MEC lança programa de educação inclusiva para escolas públicas',
          conteudo:
            'O Ministério da Educação lançou o "Programa Escola para Todos", que prevê adaptações pedagógicas e estruturais em 10 mil escolas públicas para melhor atender estudantes com deficiência.',
          categoria: CategoriaNoticia.EDUCACAO,
          foto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-06T10:00:00.000Z')
        },

        // ESPORTE
        {
          titulo:
            'Paralimpíadas de Paris 2024: Brasil conquista recorde de medalhas',
          conteudo:
            'A delegação brasileira nas Paralimpíadas de Paris 2024 conquistou o melhor resultado da história do país na competição, com 89 medalhas e destaque em modalidades como natação e atletismo.',
          categoria: CategoriaNoticia.ESPORTE,
          foto: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-04T18:00:00.000Z')
        },

        // ACESSIBILIDADE
        {
          titulo:
            'São Paulo investe R$ 50 milhões em acessibilidade no transporte público',
          conteudo:
            'A Prefeitura de São Paulo anunciou investimento de R$ 50 milhões para melhorias de acessibilidade no transporte público, incluindo elevadores, rampas e pisos táteis em 100 estações de metrô e trem.',
          categoria: CategoriaNoticia.ACESSIBILIDADE,
          foto: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
          dataPublicacao: new Date('2025-08-05T09:30:00.000Z')
        }
      ]
    })
    console.log(`✅ ${noticias.count} notícias criadas!`)

    // Criar comentários dos usuários para os profissionais
    console.log('💬 Criando comentários...')
    const comentariosData = [
      {
        conteudo:
          'Excelente profissional! Dr. Ana sempre muito atenciosa e competente. Recomendo!',
        usuarioId: usuarios[0].id,
        profissionalId: profissionaisCriados[0].id
      },
      {
        conteudo:
          'Consulta muito esclarecedora com a Dr. Ana. Tirou todas as minhas dúvidas.',
        usuarioId: usuarios[1].id,
        profissionalId: profissionaisCriados[0].id
      },
      {
        conteudo: 'Maria é uma cuidadora excepcional. Minha mãe adora ela!',
        usuarioId: usuarios[2].id,
        profissionalId: profissionaisCriados[1].id
      },
      {
        conteudo:
          'Profissional muito dedicada e carinhosa. Super recomendo seus serviços.',
        usuarioId: usuarios[3].id,
        profissionalId: profissionaisCriados[1].id
      },
      {
        conteudo:
          'Dr. Carlos me ajudou muito na recuperação. Fisioterapeuta muito competente.',
        usuarioId: usuarios[4].id,
        profissionalId: profissionaisCriados[2].id
      },
      {
        conteudo:
          'Sessões muito eficazes! Já sinto grande melhora na mobilidade.',
        usuarioId: usuarios[0].id,
        profissionalId: profissionaisCriados[2].id
      },
      {
        conteudo:
          'Dra. Beatriz é uma psicóloga incrível. Me ajudou muito a superar dificuldades.',
        usuarioId: usuarios[1].id,
        profissionalId: profissionaisCriados[3].id
      },
      {
        conteudo:
          'Terapia muito eficaz e acolhedora. Profissional muito humana.',
        usuarioId: usuarios[2].id,
        profissionalId: profissionaisCriados[3].id
      },
      {
        conteudo:
          'Enfermeira Juliana é muito atenciosa e profissional. Cuidados excelentes!',
        usuarioId: usuarios[3].id,
        profissionalId: profissionaisCriados[4].id
      },
      {
        conteudo:
          'Rosa é uma secretária do lar muito organizada e responsável.',
        usuarioId: usuarios[4].id,
        profissionalId: profissionaisCriados[5].id
      },
      {
        conteudo:
          'Ótimo atendimento da Rosa. Ela é muito prestativa e cuidadosa.',
        usuarioId: usuarios[0].id,
        profissionalId: profissionaisCriados[5].id
      },
      {
        conteudo:
          'Recomendo muito o trabalho da Enfermeira Juliana. Muito profissional!',
        usuarioId: usuarios[1].id,
        profissionalId: profissionaisCriados[4].id
      }
    ]

    const comentarios = []
    for (const comentarioData of comentariosData) {
      const comentario = await prisma.comentario.create({
        data: comentarioData
      })
      comentarios.push(comentario)
    }
    console.log(`✅ ${comentarios.length} comentários criados!`)

    // Criar likes nos comentários
    console.log('👍 Criando likes nos comentários...')
    const likesData = []

    // Gerar likes aleatórios (cada usuário pode dar like em vários comentários, mas só uma vez por comentário)
    for (let i = 0; i < comentarios.length; i++) {
      const comentario = comentarios[i]

      // Adicionar entre 1-4 likes por comentário
      const numLikes = Math.floor(Math.random() * 4) + 1
      const usuariosQueJaDeuramLike = new Set()

      for (let j = 0; j < numLikes; j++) {
        let usuarioAleatorio
        do {
          usuarioAleatorio =
            usuarios[Math.floor(Math.random() * usuarios.length)]
        } while (usuariosQueJaDeuramLike.has(usuarioAleatorio.id))

        usuariosQueJaDeuramLike.add(usuarioAleatorio.id)

        likesData.push({
          usuarioId: usuarioAleatorio.id,
          comentarioId: comentario.id
        })
      }
    }

    // Criar os likes
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
