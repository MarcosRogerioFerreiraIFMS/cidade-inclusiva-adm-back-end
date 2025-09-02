/**
 * Script para validar configurações específicas do JWT
 *
 * Executa validações específicas para o sistema de autenticação JWT:
 * - Verifica variáveis de ambiente relacionadas ao JWT
 * - Valida configurações de segurança JWT
 * - Fornece relatório detalhado de problemas encontrados
 *
 * Uso:
 * - pnpm validate-jwt
 * - npm run validate-jwt
 */

import 'dotenv/config'
import { EnvValidator } from '../src/utils/envValidator'
import { JWTSecurityConfig } from '../src/utils/jwtSecurityConfig'

/**
 * Função principal do script de validação JWT
 * Executa todas as verificações e reporta resultados
 */
function main() {
  // Primeiro valida as variáveis de ambiente relacionadas ao JWT
  const isEnvValid = EnvValidator.validateJWTAndLog()

  // Depois inicializa e valida as configurações de segurança
  const isSecurityValid = JWTSecurityConfig.initialize(true)

  const isValid = isEnvValid && isSecurityValid

  if (!isValid) {
    console.log('\n📋 Resumo dos problemas encontrados:')
    if (!isEnvValid) {
      console.log('   • Variáveis de ambiente JWT precisam ser configuradas')
    }
    if (!isSecurityValid) {
      console.log('   • Configurações de segurança JWT são inadequadas')
    }

    console.log('\n🔧 Para corrigir todos os problemas:')
    console.log('   1. Execute: pnpm generate-jwt-secret')
    console.log('   2. Configure JWT_SECRET no .env com chave segura')
    console.log('   3. Verifique formato do JWT_EXPIRES_IN (ex: 7d)')
    console.log('   4. Execute novamente: pnpm validate-jwt')

    process.exit(1)
  }

  console.log('🎉 Configuração JWT está perfeita!')
  console.log('   Sistema de autenticação pronto para produção.')
  process.exit(0)
}

try {
  main()
} catch (error) {
  console.error('❌ Erro durante a validação JWT:', error)
  process.exit(1)
}
