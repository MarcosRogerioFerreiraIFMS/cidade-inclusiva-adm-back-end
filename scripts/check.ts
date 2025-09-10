/**
 * Script para verificação completa de integridade do projeto
 *
 * Executa uma bateria de verificações essenciais para garantir que o projeto
 * está configurado corretamente e pronto para desenvolvimento ou produção:
 *
 * 1. Versão do Node.js - Verifica compatibilidade
 * 2. Variáveis de ambiente - Valida configurações necessárias
 * 3. Verificação de tipos TypeScript - Compila e verifica tipos
 * 4. Linting do código - Verifica padrões de código
 *
 * Uso:
 * - pnpm check
 * - npm run check
 */

import { EnvValidator } from '@/utils'
import chalk from 'chalk'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import semver from 'semver'

/** Formatação para títulos principais */
const title = chalk.bold.blue
/** Formatação para seções */
const section = chalk.bold.green
/** Formatação para informações */
const info = chalk.cyan
/** Formatação para mensagens de sucesso */
const success = chalk.bold.green
/** Formatação para mensagens de erro */
const error = chalk.bold.red
/** Formatação para avisos */
const warning = chalk.bold.yellow

console.log(title('\n🔍 Verificação Completa de Integridade do Projeto'))
console.log(title('=================================================\n'))

let hasErrors = false

// 1. Verificação da versão do Node.js
try {
  console.log(section('🔧 Verificando versão do Node.js...'))

  const requiredRange = '>=20.0.0'
  const currentVersion = process.version

  if (semver.satisfies(currentVersion, requiredRange)) {
    console.log(success(`   ✅ Versão do Node.js OK: ${currentVersion}`))
  } else {
    console.error(error('   ❌ Versão incompatível do Node.js detectada.'))
    console.error(
      `   ${chalk.gray('[i]')} Versão atual: ${chalk.yellow(currentVersion)}`
    )
    console.error(`   ✅ Versão requerida: ${chalk.green(requiredRange)}`)
    hasErrors = true
  }
  console.log()
} catch (err) {
  console.error(error('   ❌ Falha na verificação da versão do Node.js'))
  console.error(`   ${err}`)
  hasErrors = true
}

// 2. Validação das variáveis de ambiente
try {
  console.log(section('🌍 Validando variáveis de ambiente...'))

  const envResult = EnvValidator.validate()

  if (envResult.isValid) {
    console.log(
      success(
        '   ✅ Todas as variáveis de ambiente estão configuradas corretamente'
      )
    )

    // Mostrar apenas um resumo das variáveis configuradas
    const criticalVars = ['DATABASE_URL', 'JWT_SECRET']
    const configuredCritical = criticalVars.filter((name) => {
      const value = process.env[name]
      return value && value.trim() !== ''
    })

    console.log(
      info(
        `   📋 Variáveis críticas configuradas: ${configuredCritical.length}/${criticalVars.length}`
      )
    )

    if (envResult.missingOptional.length > 0) {
      console.log(
        warning(
          `   ⚠️  ${envResult.missingOptional.length} variáveis opcionais usando valores padrão`
        )
      )
    }
  } else {
    console.error(
      error('   ❌ Problemas encontrados nas variáveis de ambiente')
    )
    if (envResult.missingCritical.length > 0) {
      console.error(
        error(
          `   - ${envResult.missingCritical.length} variáveis críticas ausentes`
        )
      )
    }
    if (envResult.invalidValues.length > 0) {
      console.error(
        error(
          `   - ${envResult.invalidValues.length} variáveis com valores inválidos`
        )
      )
    }
    console.error(
      warning('   💡 Execute: pnpm validate-env para ver os detalhes')
    )
    hasErrors = true
  }
  console.log()
} catch (err) {
  console.error(error('   ❌ Falha na validação das variáveis de ambiente'))
  console.error(`   ${err}`)
  hasErrors = true
}

// 3. Verificação de tipos TypeScript
try {
  console.log(section('📝 Verificando tipos TypeScript...'))
  execSync('pnpm build:noEmit', { stdio: 'pipe' })
  console.log(success('   ✅ Verificação de tipos concluída com sucesso'))
  console.log()
} catch {
  console.error(error('   ❌ Falha na verificação de tipos TypeScript'))
  console.error(
    warning('   💡 Execute: pnpm build:noEmit para ver os detalhes')
  )
  hasErrors = true
}

// 4. Linting do código
try {
  console.log(section('🔧 Executando verificação de código (ESLint)...'))
  execSync('pnpm lint', { stdio: 'pipe' })
  console.log(success('   ✅ Verificação de código concluída com sucesso'))
  console.log()
} catch {
  console.error(error('   ❌ Falha na verificação de código (ESLint)'))
  console.error(warning('   💡 Execute: pnpm lint para ver os detalhes'))
  hasErrors = true
}

// Resultado final
if (hasErrors) {
  console.error(error('❌ VERIFICAÇÃO FALHOU!'))
  console.error(info('💡 Corrija os erros acima antes de prosseguir'))
  console.error(info('🔧 Comandos úteis:'))
  console.error(info('   - pnpm validate-env: Validar variáveis de ambiente'))
  console.error(info('   - pnpm build:noEmit: Verificar tipos TypeScript'))
  console.error(info('   - pnpm lint: Executar linting'))
  console.log()
  process.exit(1)
} else {
  console.log(success('✅ VERIFICAÇÃO COMPLETA CONCLUÍDA COM SUCESSO!'))
  console.log(info('🎉 Projeto está totalmente pronto para produção!'))
  console.log(info('🚀 Todas as verificações passaram:'))
  console.log(info('   ✓ Versão do Node.js compatível'))
  console.log(info('   ✓ Variáveis de ambiente configuradas'))
  console.log(info('   ✓ Tipos TypeScript válidos'))
  console.log(info('   ✓ Código sem problemas de linting\n'))
}
