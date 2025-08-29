/**
 * Script para validar variáveis de ambiente
 *
 * Uso:
 * - pnpm validate-env
 * - npm run validate-env
 */

import 'dotenv/config'
import { EnvValidator } from '../src/utils/envValidator'

function main() {
  const isValid = EnvValidator.validateAndLog(true)

  if (!isValid) {
    console.log('\n📋 Para corrigir os problemas:')
    console.log('   1. Copie .env.example para .env: cp .env.example .env')
    console.log('   2. Edite o arquivo .env com suas configurações')
    console.log('   3. Para gerar JWT_SECRET: pnpm generate-jwt-secret')
    console.log('   4. Para verificar só JWT: pnpm validate-jwt')
    console.log('   5. Execute novamente: pnpm validate-env')

    process.exit(1)
  }

  console.log(
    '🎉 Todas as variáveis de ambiente estão configuradas corretamente!'
  )
  process.exit(0)
}

try {
  main()
} catch (error) {
  console.error('❌ Erro durante a validação:', error)
  process.exit(1)
}
