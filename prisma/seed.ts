/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Limpar dados existentes
  await prisma.noticia.deleteMany()

  // Criar notícias de exemplo
  await prisma.noticia.createMany({
    data: [
      {
        titulo:
          'Carro com isenção para PCD: STF entra na discussão e pode definir novas regras',
        conteudo:
          'A Associação Nacional de Apoio às Pessoas com Deficiência (ANAPcD) decidiu agir. Por isso, entrou com uma ação no Supremo Tribunal Federal (STF) contra mudanças que afetam diretamente os PCDs.',
        categoria: 'DIREITOS',
        url: 'https://www.terra.com.br/mobilidade/carro-com-isencao-para-pcd-stf-entra-na-discussao-e-pode-definir-novas-regras,4b003cb0fd9df721122d6cb3b57c1062l4x9yr3e.html',
        foto: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/07/08/carro-pcd-1ibjskggydg0y.jpg',
        dataPublicacao: new Date('2025-04-09T00:00:00.000Z')
      },
      {
        titulo:
          'Chevrolet aumenta desconto para PCD em abril de 2025; veja nova tabela de preços',
        conteudo:
          'A Chevrolet do Brasil traz sua campanha para vendas diretas destinadas a pessoas com deficiência (PCD) no mês de abril de 2025 com reduções que podem chegar a R$ 41.995. E esse benefício é trazido na versão topo de linha Premier d Tracker, que utiliza com motorização 1.2 turbo e câmbio automático.',
        categoria: 'BENEFICIOS',
        url: 'https://mundodoautomovelparapcd.com.br/chevrolet-para-pcd-em-abril-de-2025/',
        foto: 'https://mundodoautomovelparapcd.com.br/wp-content/uploads/2025/01/Chevrolet-Tracker-Premier-2025.jpg',
        dataPublicacao: new Date('2025-04-09T00:00:00.000Z')
      },
      {
        titulo:
          'Abertas Inscrições para PCD em Hospitais Públicos do Pará – Confira as Vagas!',
        conteudo:
          'O Centro Integrado de Inclusão e Reabilitação (CIIR), em Belém; o Hospital Metropolitano de Urgência e Emergência (HMUE), em Ananindeua; e o Hospital Regional Público do Marajó (HRPM), em Breves, estão com processos seletivos abertos para contratação de profissionais em diversas áreas. As oportunidades incluem vagas exclusivas ou prioritárias para Pessoas com Deficiência (PCD).',
        categoria: 'OPORTUNIDADES',
        url: 'https://diariodopara.com.br/concursos-e-empregos/abertas-inscricoes-para-pcd-em-hospitais-publicos-do-para-confira-as-vagas/',
        foto: 'https://uploads.diariodopara.com.br/2025/04/DZMTBsBu-5593_f6f999f8-70c2-289d-0103-0760237c4022-1024x682.webp',
        dataPublicacao: new Date('2025-04-08T00:00:00.000Z')
      },
      {
        titulo:
          'Nova tecnologia assistiva revoluciona comunicação para pessoas com deficiência',
        conteudo:
          'Uma nova tecnologia desenvolvida por pesquisadores brasileiros promete revolucionar a forma como pessoas com deficiência se comunicam. O sistema utiliza inteligência artificial para interpretar movimentos oculares e transformá-los em comandos de voz.',
        categoria: 'TECNOLOGIA',
        url: 'https://exemplo.com/tecnologia-assistiva',
        foto: 'https://source.unsplash.com/800x600/?technology,accessibility',
        dataPublicacao: new Date('2025-04-07T00:00:00.000Z')
      },
      {
        titulo:
          'Programa de inclusão no esporte adaptado ganha destaque nacional',
        conteudo:
          'O programa "Esporte Para Todos" tem promovido a inclusão de pessoas com deficiência em diversas modalidades esportivas. A iniciativa já atendeu mais de 5.000 pessoas em todo o país e planeja expandir suas atividades.',
        categoria: 'ESPORTE',
        url: 'https://exemplo.com/esporte-adaptado',
        foto: 'https://source.unsplash.com/800x600/?sports,wheelchair',
        dataPublicacao: new Date('2025-04-06T00:00:00.000Z')
      },
      {
        titulo:
          'Acessibilidade urbana: Novas rampas e elevadores em estações do metrô',
        conteudo:
          'A cidade investiu R$ 20 milhões em melhorias de acessibilidade no transporte público. Foram instaladas novas rampas, elevadores e pisos táteis em 15 estações de metrô, beneficiando milhares de usuários com deficiência.',
        categoria: 'ACESSIBILIDADE',
        url: 'https://exemplo.com/acessibilidade-metro',
        foto: 'https://source.unsplash.com/800x600/?subway,accessibility',
        dataPublicacao: new Date('2025-04-05T00:00:00.000Z')
      }
    ]
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
