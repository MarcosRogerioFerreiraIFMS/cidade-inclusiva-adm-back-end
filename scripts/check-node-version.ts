/**
 * Script para verificar a compatibilidade da versão do Node.js
 *
 * Verifica se a versão atual do Node.js atende aos requisitos mínimos do projeto.
 * Exibe mensagens informativas de sucesso ou erro com sugestões de resolução.
 *
 * Uso:
 * - pnpm check-node-version
 * - npm run check-node-version
 */

import chalk from 'chalk'
import semver from 'semver'

/** Versão mínima requerida do Node.js */
const requiredRange = '>=20.0.0'
/** Versão atual do Node.js em execução */
const currentVersion = process.version

if (semver.satisfies(currentVersion, requiredRange)) {
  console.log(chalk.green(`✅ Versão do Node.js OK: ${currentVersion}`))
} else {
  console.error(chalk.red.bold('❌ Versão incompatível do Node.js detectada.'))
  console.error(
    `${chalk.gray('[i]')} Versão atual: ${chalk.yellow(currentVersion)}`
  )
  console.error(`✅ Versão requerida: ${chalk.green(requiredRange)}`)
  console.error(
    chalk.blue('💡 Dica: Instale uma versão compatível do Node.js.')
  )
  console.error(
    chalk.gray('   Use ferramentas como ') +
      chalk.cyan.bold('nvm') +
      chalk.gray(' ou ') +
      chalk.cyan.bold('Volta') +
      chalk.gray(' para gerenciar versões.')
  )
  process.exit(1)
}
