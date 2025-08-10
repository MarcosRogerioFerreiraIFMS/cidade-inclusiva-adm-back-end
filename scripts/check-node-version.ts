import semver from 'semver'

const requiredRange = '>=20.0.0'

if (semver.satisfies(process.version, requiredRange)) {
  console.log(`✅ Versão do Node.js OK: ${process.version}`)
} else {
  console.error('❌ Versão incompatível do Node.js detectada.')
  console.error(`[i] Versão atual: ${process.version}`)
  console.error(`✅ Versão requerida: ${requiredRange}`)
  console.error('💡 Por favor, instale uma versão compatível do Node.js.')
  console.error(
    '   Você pode usar ferramentas como nvm (Node Version Manager) ou Volta para gerenciar versões.'
  )
  process.exit(1)
}
