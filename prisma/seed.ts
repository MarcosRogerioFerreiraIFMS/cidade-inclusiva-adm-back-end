import {
  CategoriaNoticia,
  EspecialidadeProfissional,
  PrismaClient,
  TipoEntidade
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // Limpar dados existentes na ordem correta (respeitando foreign keys)
    console.log('🧹 Limpando dados existentes...')
    await prisma.comentario.deleteMany()
    await prisma.profissional.deleteMany()
    await prisma.noticia.deleteMany()

    console.log('✅ Dados existentes removidos com sucesso!')

    // Criar profissionais primeiro (para poder criar comentários depois)
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

    // Criar comentários para os profissionais
    console.log('💬 Criando comentários...')
    const comentarios = []

    // Comentários variados e realistas para cada profissional
    const comentariosData = [
      {
        conteudo:
          'Excelente profissional! Muito atenciosa e competente. Recomendo!',
        likes: 15,
        profissionalIndex: 0
      },
      {
        conteudo:
          'Dr. Ana sempre muito cuidadosa com os pacientes. Consulta muito esclarecedora.',
        likes: 23,
        profissionalIndex: 0
      },
      {
        conteudo: 'Maria é uma cuidadora excepcional. Minha mãe adora ela!',
        likes: 18,
        profissionalIndex: 1
      },
      {
        conteudo:
          'Profissional muito dedicada e carinhosa. Super recomendo seus serviços.',
        likes: 12,
        profissionalIndex: 1
      },
      {
        conteudo:
          'Dr. Carlos me ajudou muito na recuperação. Fisioterapeuta muito competente.',
        likes: 20,
        profissionalIndex: 2
      },
      {
        conteudo:
          'Sessões muito eficazes! Já sinto grande melhora na mobilidade.',
        likes: 16,
        profissionalIndex: 2
      },
      {
        conteudo:
          'Dra. Beatriz é uma psicóloga incrível. Me ajudou muito a superar dificuldades.',
        likes: 25,
        profissionalIndex: 3
      },
      {
        conteudo:
          'Terapia muito eficaz e acolhedora. Profissional muito humana.',
        likes: 19,
        profissionalIndex: 3
      },
      {
        conteudo:
          'Enfermeira Juliana é muito atenciosa e profissional. Cuidados excelentes!',
        likes: 14,
        profissionalIndex: 4
      },
      {
        conteudo:
          'Rosa é uma secretária do lar muito organizada e responsável.',
        likes: 11,
        profissionalIndex: 5
      }
    ]

    for (const comentarioData of comentariosData) {
      comentarios.push({
        conteudo: comentarioData.conteudo,
        likes: comentarioData.likes,
        entidadeId: profissionaisCriados[comentarioData.profissionalIndex].id,
        entidadeTipo: TipoEntidade.PROFISSIONAL,
        visivel: true
      })
    }

    const comentariosCriados = await prisma.comentario.createMany({
      data: comentarios
    })
    console.log(`✅ ${comentariosCriados.count} comentários criados!`)

    // Resumo final
    console.log('\n🎉 Seed concluído com sucesso!')
    console.log('📊 Resumo dos dados criados:')
    console.log(`   👥 Profissionais: ${profissionais.count}`)
    console.log(`   📰 Notícias: ${noticias.count}`)
    console.log(`   💬 Comentários: ${comentariosCriados.count}`)
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
