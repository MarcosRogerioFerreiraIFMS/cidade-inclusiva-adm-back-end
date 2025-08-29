/**
 * Script para verificar a versão do Node.js.
 *
 * Uso:
 * - pnpm check-node-version
 * - npm run check-node-version
 */

import chalk from 'chalk'
import semver from 'semver'

const requiredRange = '>=20.0.0'
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
