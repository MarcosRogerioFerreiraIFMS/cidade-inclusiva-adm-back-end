/**
 * Script para limpeza completa do projeto
 *
 * Remove arquivos e diretórios temporários e de build para garantir
 * um ambiente limpo de desenvolvimento. Inclui:
 *
 * - dist/ (arquivos compilados TypeScript)
 * - temp/ (arquivos temporários do sistema)
 * - coverage/ (relatórios de cobertura de testes)
 * - node_modules/.cache/ (cache de dependências)
 *
 * Uso:
 * - pnpm clean
 * - npm run clean
 */

import chalk from 'chalk'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** Formatação para títulos principais */
const title = chalk.bold.blue
/** Formatação para informações */
const info = chalk.cyan
/** Formatação para mensagens de sucesso */
const success = chalk.bold.green
/** Formatação para avisos */
const warning = chalk.bold.yellow
/** Formatação para mensagens de erro */
const error = chalk.bold.red

console.log(title('\n🧹 Limpeza Completa do Projeto'))
console.log(title('===============================\n'))

const projectRoot = process.cwd()
const dirsToClean = [
  { path: 'dist', description: 'Arquivos compilados' },
  { path: 'temp', description: 'Arquivos temporários' },
  { path: 'coverage', description: 'Relatórios de cobertura' }
]

const filesToClean: Array<{ path: string; description: string }> = []

let itemsCleaned = 0
let hasErrors = false

// Função para verificar se um caminho existe
function pathExists(relativePath: string): boolean {
  return existsSync(join(projectRoot, relativePath))
}

// Função para executar comando de limpeza
function cleanPath(relativePath: string, description: string): boolean {
  try {
    if (pathExists(relativePath)) {
      console.log(info(`   🗑️  Removendo ${description}...`))

      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${relativePath}"`, {
          cwd: projectRoot,
          stdio: 'pipe'
        })
      } else {
        execSync(`rm -rf "${relativePath}"`, {
          cwd: projectRoot,
          stdio: 'pipe'
        })
      }

      console.log(success(`      ✅ ${description} removido(s) com sucesso`))
      return true
    } else {
      console.log(
        warning(`      ⚠️  ${description} não encontrado(s) - ignorando`)
      )
      return false
    }
  } catch (err) {
    console.error(error(`      ❌ Falha ao remover ${description}`))
    console.error(
      `      ${chalk.gray('Erro:')} ${
        err instanceof Error ? err.message : 'Erro desconhecido'
      }`
    )
    hasErrors = true
    return false
  }
}

// Limpeza de diretórios
console.log(chalk.bold.green('📁 Limpando diretórios...'))
for (const { path, description } of dirsToClean) {
  if (cleanPath(path, description)) {
    itemsCleaned++
  }
}

console.log()

// Limpeza de arquivos (se houver)
if (filesToClean.length > 0) {
  console.log(chalk.bold.green('📄 Limpando arquivos...'))
  for (const { path, description } of filesToClean) {
    if (cleanPath(path, description)) {
      itemsCleaned++
    }
  }
  console.log()
}

// Relatório final
if (hasErrors) {
  console.log(error('❌ Limpeza concluída com erros'))
  console.log(`   ${chalk.gray('Items limpos:')} ${itemsCleaned}`)
  process.exit(1)
} else {
  console.log(success('✅ Limpeza concluída com sucesso!'))
  console.log(`   ${chalk.gray('Items limpos:')} ${itemsCleaned}`)

  if (itemsCleaned === 0) {
    console.log(
      info('   💡 Nenhum arquivo ou diretório para limpar foi encontrado')
    )
  }
}

console.log()
