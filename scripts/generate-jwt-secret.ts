/**
 * Script para gerar chaves JWT seguras
 *
 * Gera chaves criptográficas seguras para uso como JWT_SECRET.
 * Produz chaves em formato hexadecimal e base64 com diferentes comprimentos.
 * Essencial para configuração de segurança do sistema de autenticação.
 *
 * Uso:
 * - pnpm generate-jwt-secret
 * - npm run generate-jwt-secret
 */

import chalk from 'chalk'
import crypto from 'node:crypto'

/**
 * Gera uma chave secreta em formato hexadecimal
 * @param {number} length - Número de bytes para a chave (padrão: 64)
 * @returns {string} Chave em formato hexadecimal
 */
function generateSecretKey(length = 64) {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Gera uma chave secreta em formato base64
 * @param {number} length - Número de bytes para a chave (padrão: 64)
 * @returns {string} Chave em formato base64
 */
function generateSecretBase64(length = 64) {
  return crypto.randomBytes(length).toString('base64')
}

/** Formatação para títulos principais */
const title = chalk.bold.blue
/** Formatação para seções */
const section = chalk.bold.green
/** Formatação para valores de chave */
const keyValue = chalk.whiteBright
/** Formatação para instruções */
const instruction = chalk.cyan
/** Formatação para avisos de segurança */
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
