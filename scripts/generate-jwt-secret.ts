/**
 * Script para gerar chaves JWT seguras
 * Uso:
 * - pnpm generate-jwt-secret
 * - npm run generate-jwt-secret
 */

import chalk from 'chalk'
import crypto from 'node:crypto'

function generateSecretKey(length = 64) {
  return crypto.randomBytes(length).toString('hex')
}

function generateSecretBase64(length = 64) {
  return crypto.randomBytes(length).toString('base64')
}

const title = chalk.bold.blue
const section = chalk.bold.green
const keyValue = chalk.whiteBright
const instruction = chalk.cyan
const warning = chalk.bold.red

console.log(title('\n🔐 Gerador de Chaves JWT Seguras'))
console.log(title('========================================\n'))

console.log(section('Chave Hexadecimal (64 bytes):'))
console.log(keyValue(generateSecretKey(64)))

console.log('\n' + section('Chave Hexadecimal (32 bytes):'))
console.log(keyValue(generateSecretKey(32)))

console.log('\n' + section('Chave Base64 (64 bytes):'))
console.log(keyValue(generateSecretBase64(64)))

console.log('\n' + section('📋 Instruções:'))
console.log(instruction('1.') + ' Copie uma das chaves acima')
console.log(instruction('2.') + ' Adicione ao seu arquivo .env:')
console.log(instruction('   JWT_SECRET=') + chalk.gray('sua-chave-aqui'))
console.log(instruction('3.') + ' Nunca compartilhe ou commite a chave!')

console.log('\n' + warning('⚠️  Importante:'))
console.log(
  '- Use chaves diferentes para ' +
    chalk.underline('desenvolvimento') +
    ' e ' +
    chalk.underline('produção')
)
console.log(
  '- Chaves ' +
    chalk.bold('hexadecimais') +
    ' são recomendadas para ' +
    chalk.magenta('HS256')
)
console.log(
  '- Mantenha as chaves em local seguro (ex: gerenciador de secrets)\n'
)
