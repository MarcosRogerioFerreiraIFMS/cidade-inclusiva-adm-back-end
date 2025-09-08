import { Prisma } from '@prisma/client'
import { db } from '../database/prisma'

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

  // Se já houver uma foto associada e ela for diferente da nova
  if (usuario.foto.url !== novaUrl) {
    await db.foto.delete({ where: { id: usuario.foto.id } })
    return { create: { url: novaUrl } }
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

  // Se já houver uma foto associada e ela for diferente da nova
  if (profissional.foto.url !== novaUrl) {
    await db.foto.delete({ where: { id: profissional.foto.id } })
    return { create: { url: novaUrl } }
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

  // Se já houver uma foto associada e ela for diferente da nova
  if (noticia.foto.url !== novaUrl) {
    await db.foto.delete({ where: { id: noticia.foto.id } })
    return { create: { url: novaUrl } }
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

  // Se já houver uma foto associada e ela for diferente da nova
  if (motorista.foto.url !== novaUrl) {
    await db.foto.delete({ where: { id: motorista.foto.id } })
    return { create: { url: novaUrl } }
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
        veiculoId: veiculoId,
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
