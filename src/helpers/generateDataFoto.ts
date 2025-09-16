import { db } from '@/database/prisma'
import type { Prisma } from '@prisma/client'

/**
 * Gera dados para criação de uma única foto para usuário
 * @param url - URL da foto (opcional)
 * @returns Dados formatados para criação de foto única no Prisma
 */
export function generateDataFotoUsuarioCreate(
  url: string | undefined
): Prisma.FotoCreateNestedOneWithoutUsuarioInput | undefined {
  return url
    ? {
        create: { url }
      }
    : undefined
}

/**
 * Gera dados para criação de uma única foto para profissional
 * @param url - URL da foto (opcional)
 * @returns Dados formatados para criação de foto única no Prisma
 */
export function generateDataFotoProfissionalCreate(
  url: string | undefined
): Prisma.FotoCreateNestedOneWithoutProfissionalInput | undefined {
  return url
    ? {
        create: { url }
      }
    : undefined
}

/**
 * Gera dados para criação de uma única foto para notícia
 * @param url - URL da foto (opcional)
 * @returns Dados formatados para criação de foto única no Prisma
 */
export function generateDataFotoNoticiaCreate(
  url: string | undefined
): Prisma.FotoCreateNestedOneWithoutNoticiaInput | undefined {
  return url
    ? {
        create: { url }
      }
    : undefined
}

/**
 * Gera dados para criação de uma única foto para motorista
 * @param url - URL da foto (opcional)
 * @returns Dados formatados para criação de foto única no Prisma
 */
export function generateDataFotoMotoristaCreate(
  url: string | undefined
): Prisma.FotoCreateNestedOneWithoutMotoristaInput | undefined {
  return url
    ? {
        create: { url }
      }
    : undefined
}

/**
 * Gera dados para criação de múltiplas fotos para veículo
 * @param urls - Array de URLs das fotos
 * @returns Dados formatados para criação de múltiplas fotos no Prisma
 */
export function generateDataFotosVeiculoCreate(
  urls: string[] = []
): Prisma.FotoCreateNestedManyWithoutVeiculoInput | undefined {
  return urls.length > 0
    ? {
        create: urls.map((url) => ({ url }))
      }
    : undefined
}

/**
 * Gera dados para atualização de uma única foto de usuário
 * Lida com casos onde a foto não existe, existe mas é diferente, ou é igual
 * @param novaUrl - Nova URL da foto
 * @param usuarioId - ID do usuário
 * @returns Dados formatados para atualização de foto única no Prisma
 */
export async function generateDataFotoUsuarioUpdate(
  novaUrl: string | undefined,
  usuarioId: string
): Promise<Prisma.FotoUpdateOneWithoutUsuarioNestedInput | undefined> {
  if (novaUrl === undefined) {
    return undefined
  }

  const usuario = await db.usuario.findUnique({
    where: { id: usuarioId },
    include: { foto: true }
  })

  if (!usuario) {
    throw new Error('Usuário não encontrado')
  }

  // Se não houver foto associada, cria uma nova
  if (!usuario.foto) {
    return { create: { url: novaUrl } }
  }

  // Se já houver uma foto associada e ela for diferente da nova, atualiza
  if (usuario.foto.url !== novaUrl) {
    await db.foto.update({
      where: { id: usuario.foto.id },
      data: { url: novaUrl }
    })
  }

  // Se a foto for igual, não faz nada
  return undefined
}

/**
 * Gera dados para atualização de uma única foto de profissional
 * @param novaUrl - Nova URL da foto
 * @param profissionalId - ID do profissional
 * @returns Dados formatados para atualização de foto única no Prisma
 */
export async function generateDataFotoProfissionalUpdate(
  novaUrl: string | undefined,
  profissionalId: string
): Promise<Prisma.FotoUpdateOneWithoutProfissionalNestedInput | undefined> {
  if (novaUrl === undefined) {
    return undefined
  }

  const profissional = await db.profissional.findUnique({
    where: { id: profissionalId },
    include: { foto: true }
  })

  if (!profissional) {
    throw new Error('Profissional não encontrado')
  }

  // Se não houver foto associada, cria uma nova
  if (!profissional.foto) {
    return { create: { url: novaUrl } }
  }

  // Se já houver uma foto associada e ela for diferente da nova, atualiza
  if (profissional.foto.url !== novaUrl) {
    await db.foto.update({
      where: { id: profissional.foto.id },
      data: { url: novaUrl }
    })
  }

  // Se a foto for igual, não faz nada
  return undefined
}

/**
 * Gera dados para atualização de uma única foto de notícia
 * @param novaUrl - Nova URL da foto
 * @param noticiaId - ID da notícia
 * @returns Dados formatados para atualização de foto única no Prisma
 */
export async function generateDataFotoNoticiaUpdate(
  novaUrl: string | undefined,
  noticiaId: string
): Promise<Prisma.FotoUpdateOneWithoutNoticiaNestedInput | undefined> {
  if (novaUrl === undefined) {
    return undefined
  }

  const noticia = await db.noticia.findUnique({
    where: { id: noticiaId },
    include: { foto: true }
  })

  if (!noticia) {
    throw new Error('Notícia não encontrada')
  }

  // Se não houver foto associada, cria uma nova
  if (!noticia.foto) {
    return { create: { url: novaUrl } }
  }

  // Se já houver uma foto associada e ela for diferente da nova, atualiza
  if (noticia.foto.url !== novaUrl) {
    await db.foto.update({
      where: { id: noticia.foto.id },
      data: { url: novaUrl }
    })
  }

  // Se a foto for igual, não faz nada
  return undefined
}

/**
 * Gera dados para atualização de uma única foto de motorista
 * @param novaUrl - Nova URL da foto
 * @param motoristaId - ID do motorista
 * @returns Dados formatados para atualização de foto única no Prisma
 */
export async function generateDataFotoMotoristaUpdate(
  novaUrl: string | undefined,
  motoristaId: string
): Promise<Prisma.FotoUpdateOneWithoutMotoristaNestedInput | undefined> {
  if (novaUrl === undefined) {
    return undefined
  }

  const motorista = await db.motorista.findUnique({
    where: { id: motoristaId },
    include: { foto: true }
  })

  if (!motorista) {
    throw new Error('Motorista não encontrado')
  }

  // Se não houver foto associada, cria uma nova
  if (!motorista.foto) {
    return { create: { url: novaUrl } }
  }

  // Se já houver uma foto associada e ela for diferente da nova, atualiza
  if (motorista.foto.url !== novaUrl) {
    await db.foto.update({
      where: { id: motorista.foto.id },
      data: { url: novaUrl }
    })
  }

  // Se a foto for igual, não faz nada
  return undefined
}

/**
 * Gera dados para atualização de múltiplas fotos de veículo
 * Remove fotos que não estão na nova lista e adiciona fotos novas
 * @param novasUrls - Array com as novas URLs das fotos
 * @param veiculoId - ID do veículo
 * @returns Dados formatados para atualização de múltiplas fotos no Prisma
 */
export async function generateDataFotosVeiculoUpdate(
  novasUrls: string[] | undefined,
  veiculoId: string
): Promise<Prisma.FotoUpdateManyWithoutVeiculoNestedInput | undefined> {
  if (novasUrls === undefined) {
    return undefined
  }

  const veiculo = await db.veiculo.findUnique({
    where: { id: veiculoId },
    include: { fotos: true }
  })

  if (!veiculo) {
    throw new Error('Veículo não encontrado')
  }

  // Remove apenas as fotos que não estão nas URLs passadas
  const existingUrls = veiculo.fotos.map((foto) => foto.url)
  const urlsToRemove = existingUrls.filter(
    (urlExisting) => !novasUrls.includes(urlExisting)
  )

  if (urlsToRemove.length > 0) {
    await db.foto.deleteMany({
      where: {
        veiculoId,
        url: {
          in: urlsToRemove
        }
      }
    })
  }

  // Adiciona apenas as novas fotos (que não existem)
  const newUrls = novasUrls.filter((url) => !existingUrls.includes(url))
  if (newUrls.length > 0) {
    return {
      create: newUrls.map((url) => ({ url }))
    }
  }

  return undefined
}

/**
 * Gera dados para criação de múltiplas fotos para manutenção
 * @param urls - Array de URLs das fotos
 * @returns Dados formatados para criação de múltiplas fotos no Prisma
 */
export function generateDataFotoManutencaoCreate(
  urls: string[] = []
): Prisma.FotoCreateNestedManyWithoutManutencaoInput | undefined {
  return urls.length > 0
    ? {
        create: urls.map((url) => ({ url }))
      }
    : undefined
}

/**
 * Gera dados para criação de uma única foto de logo para manutenção
 * @param url - URL do logo (opcional)
 * @returns Dados formatados para criação de logo único no Prisma
 */
export function generateDataLogoManutencaoCreate(
  url: string | undefined
): Prisma.FotoCreateNestedOneWithoutManutencaoLogoInput | undefined {
  return url
    ? {
        create: { url }
      }
    : undefined
}

/**
 * Gera dados para atualização de múltiplas fotos de manutenção
 * Remove fotos que não estão na nova lista e adiciona fotos novas
 * @param novasUrls - Array com as novas URLs das fotos
 * @param manutencaoId - ID da manutenção
 * @returns Dados formatados para atualização de múltiplas fotos no Prisma
 */
export async function generateDataFotoManutencaoUpdate(
  novasUrls: string[] | undefined,
  manutencaoId: string
): Promise<Prisma.FotoUpdateManyWithoutManutencaoNestedInput | undefined> {
  if (novasUrls === undefined) {
    return undefined
  }

  const manutencao = await db.manutencao.findUnique({
    where: { id: manutencaoId },
    include: { fotos: true }
  })

  if (!manutencao) {
    throw new Error('Manutenção não encontrada')
  }

  // Remove apenas as fotos que não estão nas URLs passadas
  const existingUrls = manutencao.fotos.map((foto) => foto.url)
  const urlsToRemove = existingUrls.filter(
    (urlExisting) => !novasUrls.includes(urlExisting)
  )

  if (urlsToRemove.length > 0) {
    await db.foto.deleteMany({
      where: {
        manutencaoId,
        url: {
          in: urlsToRemove
        }
      }
    })
  }

  // Adiciona apenas as novas fotos (que não existem)
  const newUrls = novasUrls.filter((url) => !existingUrls.includes(url))
  if (newUrls.length > 0) {
    return {
      create: newUrls.map((url) => ({ url }))
    }
  }

  return undefined
}

/**
 * Gera dados para atualização de uma única foto de logo de manutenção
 * @param novaUrl - Nova URL do logo
 * @param manutencaoId - ID da manutenção
 * @returns Dados formatados para atualização de logo único no Prisma
 */
export async function generateDataLogoManutencaoUpdate(
  novaUrl: string | undefined,
  manutencaoId: string
): Promise<Prisma.FotoUpdateOneWithoutManutencaoLogoNestedInput | undefined> {
  if (novaUrl === undefined) {
    return undefined
  }

  const manutencao = await db.manutencao.findUnique({
    where: { id: manutencaoId },
    include: { logo: true }
  })

  if (!manutencao) {
    throw new Error('Manutenção não encontrada')
  }

  // Se não houver logo associado, cria um novo
  if (!manutencao.logo) {
    return { create: { url: novaUrl } }
  }

  // Se já houver um logo associado e ele for diferente do novo
  if (manutencao.logo.url !== novaUrl) {
    await db.foto.delete({ where: { id: manutencao.logo.id } })
    return { create: { url: novaUrl } }
  }

  // Se o logo for igual, não faz nada
  return undefined
}

/**
 * Gera dados para criação de múltiplas fotos para acessibilidade urbana
 * @param urls - Array de URLs das fotos
 * @returns Dados formatados para criação de múltiplas fotos no Prisma
 */
export function generateDataFotoAcessibilidadeUrbanaCreate(
  urls: string[] = []
): Prisma.FotoCreateNestedManyWithoutAcessibilidadeUrbanaInput | undefined {
  return urls.length > 0
    ? {
        create: urls.map((url) => ({ url }))
      }
    : undefined
}

/**
 * Gera dados para criação de uma única foto de logo para acessibilidade urbana
 * @param url - URL do logo (opcional)
 * @returns Dados formatados para criação de logo único no Prisma
 */
export function generateDataLogoAcessibilidadeUrbanaCreate(
  url: string | undefined
): Prisma.FotoCreateNestedOneWithoutAcessibilidadeUrbanaLogoInput | undefined {
  return url
    ? {
        create: { url }
      }
    : undefined
}

/**
 * Gera dados para atualização de múltiplas fotos de acessibilidade urbana
 * Remove fotos que não estão na nova lista e adiciona fotos novas
 * @param novasUrls - Array com as novas URLs das fotos
 * @param acessibilidadeUrbanaId - ID da acessibilidade urbana
 * @returns Dados formatados para atualização de múltiplas fotos no Prisma
 */
export async function generateDataFotoAcessibilidadeUrbanaUpdate(
  novasUrls: string[] | undefined,
  acessibilidadeUrbanaId: string
): Promise<
  Prisma.FotoUpdateManyWithoutAcessibilidadeUrbanaNestedInput | undefined
> {
  if (novasUrls === undefined) {
    return undefined
  }

  const acessibilidadeUrbana = await db.acessibilidadeUrbana.findUnique({
    where: { id: acessibilidadeUrbanaId },
    include: { fotos: true }
  })

  if (!acessibilidadeUrbana) {
    throw new Error('Acessibilidade urbana não encontrada')
  }

  // Remove apenas as fotos que não estão nas URLs passadas
  const existingUrls = acessibilidadeUrbana.fotos.map((foto) => foto.url)
  const urlsToRemove = existingUrls.filter(
    (urlExisting) => !novasUrls.includes(urlExisting)
  )

  if (urlsToRemove.length > 0) {
    await db.foto.deleteMany({
      where: {
        acessibilidadeUrbanaId,
        url: {
          in: urlsToRemove
        }
      }
    })
  }

  // Adiciona apenas as novas fotos (que não existem)
  const newUrls = novasUrls.filter((url) => !existingUrls.includes(url))
  if (newUrls.length > 0) {
    return {
      create: newUrls.map((url) => ({ url }))
    }
  }

  return undefined
}

/**
 * Gera dados para atualização de uma única foto de logo de acessibilidade urbana
 * @param novaUrl - Nova URL do logo
 * @param acessibilidadeUrbanaId - ID da acessibilidade urbana
 * @returns Dados formatados para atualização de logo único no Prisma
 */
export async function generateDataLogoAcessibilidadeUrbanaUpdate(
  novaUrl: string | undefined,
  acessibilidadeUrbanaId: string
): Promise<
  Prisma.FotoUpdateOneWithoutAcessibilidadeUrbanaLogoNestedInput | undefined
> {
  if (novaUrl === undefined) {
    return undefined
  }

  const acessibilidadeUrbana = await db.acessibilidadeUrbana.findUnique({
    where: { id: acessibilidadeUrbanaId },
    include: { logo: true }
  })

  if (!acessibilidadeUrbana) {
    throw new Error('Acessibilidade urbana não encontrada')
  }

  // Se não houver logo associado, cria um novo
  if (!acessibilidadeUrbana.logo) {
    return { create: { url: novaUrl } }
  }

  // Se já houver um logo associado e ele for diferente do novo
  if (acessibilidadeUrbana.logo.url !== novaUrl) {
    await db.foto.delete({ where: { id: acessibilidadeUrbana.logo.id } })
    return { create: { url: novaUrl } }
  }

  // Se o logo for igual, não faz nada
  return undefined
}
