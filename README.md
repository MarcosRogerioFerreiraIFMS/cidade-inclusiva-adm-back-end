# 🌆 Projeto Cidade Inclusiva - Painel Administrativo - API

O **Cidade Inclusiva - Painel Administrativo - API** é uma aplicação backend desenvolvida para gerenciar e fornecer suporte à iniciativa **Cidade Inclusiva**, que visa melhorar a mobilidade urbana para cadeirantes e pessoas com deficiência. Este projeto utiliza tecnologias modernas para garantir eficiência, segurança e escalabilidade, permitindo que os administradores gerenciem dados e funcionalidades de forma intuitiva e confiável.

## 🎯 Objetivo do Projeto

O sistema tem como objetivo principal facilitar a inclusão social e a mobilidade urbana através de:

- **🚍 Gestão de Transporte:** Controle de veículos, motoristas e rotas acessíveis
- **♿ Acessibilidade Urbana:** Catalogação e monitoramento de locais acessíveis na cidade
- **🔧 Manutenção:** Gerenciamento de solicitações e acompanhamento de reparos
- **📰 Comunicação:** Sistema de notícias e informações relevantes
- **👥 Comunidade:** Plataforma de comentários e interação entre usuários
- **🏥 Profissionais:** Cadastro e gestão de profissionais especializados

## 📋 Informações do Projeto

- **Nome:** cidade-inclusiva-adm-back-end
- **Versão:** 1.0.0
- **Descrição:** API do sistema Cidade Inclusiva
- **Node.js:** >=20.0.0 (versão mínima requerida)
- **Ponto de entrada:** dist/src/server.js

## 📚 Documentação de Apoio

| 📄 Descrição                            | 🔗 Link                                                                                                                |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| 📝 Desenvolvimento do Plano de Trabalho | [Plano de Trabalho](https://docs.google.com/document/d/1nRhvRcXlDFgf7TtoWgm3VRqlIvhKTE5sb9miVpVaVKU/edit?usp=sharing)  |
| 📄 Documentação do Projeto Mobile       | [Documentação Cidade Inclusiva](https://docs.google.com/document/d/1VxejBnzkMbvmlPWUQOMgSNrHDl5ugXdu/edit?usp=sharing) |
| 🎨 Protótipo Inicial no Figma           | [Figma](https://www.figma.com/design/sHp0ryMHBTla6oVVEYJSOv)                                                           |
| 📱 Protótipo Mobile no Vercel           | [Cidade Inclusiva - Mobile](https://fundect-pictec3-mobile-cidade-inclusiva.vercel.app/login)                          |
| 🛠️ Modelagem UML do Projeto             | [Cidade Inclusiva - UML](https://app.diagrams.net/#G1c72Gns79DE7laBVADoPoukr65F1AaNS-)                                 |
| 📂 Repositório Mobile no GitHub         | [Cidade Inclusiva - Mobile](https://github.com/marcosrogerio-jrf/fundect-pictec3-mobile-cidade-inclusiva)              |
| 🖥️ Repositório Frontend no GitHub       | [Cidade Inclusiva - Frontend](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-front-end)             |

## ⚡ Scripts Disponíveis

### 🚀 Scripts de Execução

| 📜 **Script** | 📖 **Descrição**                                                       | 🏃‍♂️ **Comando** |
| ------------- | ---------------------------------------------------------------------- | -------------- |
| `dev`         | Inicia o servidor em modo de desenvolvimento com hot-reload usando tsx | `pnpm dev`     |
| `start`       | Inicia o servidor em modo de produção (requer build)                   | `pnpm start`   |
| `build`       | Compila o código TypeScript para JavaScript na pasta `dist/`           | `pnpm build`   |

### 🌱 Script de Seed Avançado

O script de seed é uma funcionalidade robusta que popula o banco de dados com dados realistas para desenvolvimento:

#### 🛡️ Proteções de Segurança Implementadas

1. **🔒 Bloqueio por NODE_ENV:**

   - Bloqueia execução se `NODE_ENV === 'production'` ou `'prod'`
   - Permite apenas em `'development'`, `'test'` ou `undefined`

2. **🔍 Verificação de URL Suspeita:**

   - Detecta padrões de produção na `DATABASE_URL`
   - Bloqueia se URL contém: `prod`, `amazonaws`, `heroku`, `railway`, etc.

3. **📊 Verificação de Volume de Dados:**
   - Conta registros existentes antes da limpeza
   - Bloqueia se >500 registros (exceto em `NODE_ENV=development`)

#### 📊 Logs Informativos

O seed fornece logs coloridos e detalhados mostrando:

- ✅ Status de segurança e validações
- 📈 Progresso de criação de dados
- 📊 Estatísticas finais de registros criados
- ⏱️ Tempo total de execução

### 🗄️ Scripts do Banco de Dados (Prisma)

| 📜 **Script** | 📖 **Descrição**                                                            | 🏃‍♂️ **Comando** |
| ------------- | --------------------------------------------------------------------------- | -------------- |
| `migrate`     | Executa as migrações do banco de dados em modo desenvolvimento              | `pnpm migrate` |
| `seed`        | Popula o banco com dados realistas e protegidos contra execução em produção | `pnpm seed`    |
| `studio`      | Abre o Prisma Studio para visualizar e editar dados do banco                | `pnpm studio`  |
| `push`        | Aplica mudanças do schema diretamente no banco (sem criar migrações)        | `pnpm push`    |
| `pull`        | Puxa o schema do banco de dados para o arquivo `prisma/schema.prisma`       | `pnpm pull`    |
| `status`      | Mostra o status das migrações do banco de dados                             | `pnpm status`  |

### 🔧 Scripts de Sistema

| 📜 **Script**         | 📖 **Descrição**                                                                                 | 🏃‍♂️ **Comando**             |
| --------------------- | ------------------------------------------------------------------------------------------------ | -------------------------- |
| `lint`                | Executa o ESLint para verificar problemas no código TypeScript                                   | `pnpm lint`                |
| `build:noEmit`        | Verifica a compilação TypeScript sem gerar arquivos de saída                                     | `pnpm build:noEmit`        |
| `check`               | Verifica a compilação e linting do código                                                        | `pnpm check`               |
| `clean`               | Remove pastas de build, temporárias e coverage                                                   | `pnpm clean`               |
| `generate-jwt-secret` | Gera uma chave secreta JWT para autenticação                                                     | `pnpm generate-jwt-secret` |
| `validate-env`        | **Valida variáveis de ambiente**: verifica se todas as configurações necessárias estão presentes | `pnpm validate-env`        |
| `validate-jwt`        | **Validação específica do JWT**: verifica configurações de autenticação e segurança JWT          | `pnpm validate-jwt`        |

### 📝 Explicação Detalhada dos Scripts

#### 🚀 Scripts de Desenvolvimento

- **`dev`**: Utiliza o `tsx` em modo watch para monitorar mudanças no código TypeScript e reiniciar automaticamente o servidor. Ideal para desenvolvimento.
- **`build`**: Compila todo o código TypeScript para JavaScript, criando os arquivos na pasta `dist/`.
- **`start`**: Executa a versão compilada da aplicação (arquivo `dist/src/server.js`). Usado em produção.

#### 🗃️ Scripts do Prisma

- **`migrate`**: Executa `prisma migrate dev` para aplicar migrações pendentes ao banco de dados de desenvolvimento.
- **`seed`**: Executa o arquivo `prisma/seed.ts` que popula o banco com dados iniciais realistas e bem estruturados. O script possui proteções avançadas contra execução em produção, incluindo verificação de `NODE_ENV`, detecção de URLs suspeitas e análise de volume de dados. Cria usuários com endereços reais (via BrasilAPI), profissionais especializados, notícias categorizadas, sistema completo de comentários e likes, dados de transporte, locais de acessibilidade urbana e solicitações de manutenção. Durante a execução, exibe logs coloridos e informativos com progresso detalhado, estatísticas finais e tempo de execução. ⚠️ **Remove todos os dados existentes** antes de popular!
- **`studio`**: Abre uma interface web para visualizar e editar dados do banco de dados.
- **`push`**: Aplica mudanças do schema diretamente no banco sem criar arquivos de migração.
- **`pull`**: Sincroniza o schema do Prisma com a estrutura atual do banco de dados.
- **`status`**: Mostra informações sobre o estado das migrações.

#### 🔧 Scripts de Qualidade e Manutenção

- **`lint`**: Executa o ESLint em todos os arquivos TypeScript (.ts) com zero tolerância a warnings. Identifica problemas de código, estilo e potenciais bugs.
- **`build:noEmit`**: Executa a verificação de tipos do TypeScript sem gerar arquivos de saída. Útil para validar o código antes de commits ou em pipelines de CI/CD.
- **`check`**: Script de verificação completa que executa compilação TypeScript (sem gerar arquivos) e linting. Ideal para CI/CD.
- **`clean`**: Remove pastas de build (`dist/`), temporárias (`temp/`) e de coverage (`coverage/`). Limpa o projeto para um novo build.
- **`generate-jwt-secret`**: Executa o arquivo `scripts/generate-jwt-secret.ts` para gerar uma chave secreta JWT segura para autenticação. A chave gerada deve ser usada nas variáveis de ambiente.
- **`validate-env`**: Executa validação completa das variáveis de ambiente, verificando se todas as configurações necessárias estão presentes e válidas. Mostra relatório detalhado com variáveis críticas, opcionais e valores inválidos.
- **`validate-jwt`**: Executa validação específica e detalhada das configurações JWT, verificando a segurança da chave secreta, formato do tempo de expiração e inicialização adequada. Oferece instruções passo a passo para correção de problemas relacionados à autenticação.

## 🔍 Validação de Variáveis de Ambiente

Este projeto inclui um **sistema robusto de validação de variáveis de ambiente** que garante que todas as configurações necessárias estejam presentes e válidas antes da aplicação iniciar.

### ✅ Variáveis Críticas (Obrigatórias)

- **`DATABASE_URL`**: URL de conexão com o banco de dados
- **`JWT_SECRET`**: Chave secreta para tokens JWT (mínimo 32 caracteres)

### ⚠️ Variáveis Importantes (com valores padrão)

- **`JWT_EXPIRES_IN`**: Tempo de expiração do token (padrão: `7d`)
- **`NODE_ENV`**: Ambiente de execução (padrão: `development`)
- **`PORT`**: Porta do servidor (padrão: `5555`)

### 🔧 Variáveis Opcionais

- **`ALLOWED_ORIGINS`**: Origins permitidas para CORS (padrão: `http://localhost:3000`)

### 🚀 Como Usar

1. **Validar variáveis sem iniciar o servidor:**

   ```bash
   pnpm validate-env
   ```

2. **Configuração inicial:**

   ```bash
   # 1. Copie o arquivo de exemplo
   cp .env.example .env

   # 2. Gere uma chave JWT segura
   pnpm generate-jwt-secret

   # 3. Configure suas variáveis no .env
   # 4. Valide a configuração
   pnpm validate-env
   ```

3. **A validação acontece automaticamente** quando você inicia o servidor com `pnpm dev` ou `pnpm start`.

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura bem organizada e modular, baseada em três entidades principais: **Comentários**, **Notícias** e **Profissionais**.

### 🗄️ **Banco de Dados**

- **📂 `prisma/`** - Configurações do banco de dados
  - **📂 `migrations/`** - 🔄 Controle de versões do banco
  - **📄 `schema.prisma`** - 🎯 Estrutura das tabelas e relacionamentos
  - **📄 `seed.ts`** - 🌱 Dados iniciais otimizados para desenvolvimento com logs coloridos e informativos

### 🏗️ **Arquitetura Principal (Camadas)**

Cada entidade (Comentário, Notícia, Profissional) segue o padrão de arquitetura em camadas:

- **📂 `src/controllers/`** - 🎮 **Controladores HTTP**

  - Gerenciam requisições e respostas da API
  - Validam dados de entrada e retornam respostas padronizadas

- **📂 `src/services/`** - 🧠 **Serviços de Negócio**

  - Contêm toda a lógica de negócios da aplicação
  - Orquestram operações entre repositórios e validações

- **📂 `src/repositories/`** - 🗃️ **Repositórios de Dados**

  - Abstraem o acesso aos dados do banco
  - Implementam operações CRUD específicas

- **📂 `src/daos/`** - 💾 **Data Access Objects**

  - Executam operações diretas no banco de dados via Prisma
  - Camada mais baixa de acesso aos dados

- **📂 `src/routes/`** - 🛤️ **Definição de Rotas**
  - Mapeiam endpoints HTTP para controladores
  - Definem middlewares específicos por rota

### 🔌 **Injeção de Dependências**

- **📂 `src/dependencies/`** - 📂 **Gerenciamento de Dependências**
  - Criam e conectam as instâncias das camadas
  - Facilitam testes e manutenção do código

### 📋 **Estrutura e Validação de Dados**

- **📂 `src/dtos/`** - 📦 **Data Transfer Objects**

  - **📂 `create/`** - ➕ Estruturas para criação
  - **📂 `update/`** - ✏️ Estruturas para atualização
  - **📂 `response/`** - 📤 Estruturas de resposta

- **📂 `src/schemas/`** - ✅ **Validação com Zod**

  - Definem regras de validação para cada entidade
  - Garantem integridade dos dados de entrada

- **📂 `src/interfaces/`** - 📋 **Contratos TypeScript**
  - **📂 `access/`** - Interfaces para DAOs e Repositories
  - **📂 `services/`** - Interfaces para Services

### 📊 **Transformação de Dados**

- **📂 `src/mappers/`** - 🔄 **Conversores de Dados**

  - **📂 `input/`** - Converte dados de entrada para DTOs
  - **📂 `output/`** - Converte DTOs para respostas da API

- **📂 `src/helpers/`** - 🤝 **Funções de Apoio**
  - Geram dados formatados para operações do banco
  - Auxiliam na preparação de dados para Prisma

### 🛡️ **Middlewares e Configurações**

- **📂 `src/middlewares/`** - 🛡️ **Interceptadores**

  - `errorMiddleware.ts` - Tratamento global de erros
  - `timeoutMiddleware.ts` - Controle de timeout de requisições
  - `validationMiddleware.ts` - Validação automática com schemas

- **📂 `src/configs/`** - ⚙️ **Configurações**
  - `routePaths.ts` - Centraliza definição de caminhos da API

### 🛠️ **Utilitários**

- **📂 `src/utils/`** - 🛠️ **Funções Auxiliares**

  - `HandleError.ts` / `HandleSuccess.ts` - Padronização de respostas
  - `HttpError.ts` - Classe customizada para erros HTTP
  - `stringUtils.ts` / `urlUtils.ts` - Utilitários gerais

- **📂 `src/lib/`** - 📚 **Bibliotecas Compartilhadas**

  - `prisma.ts` - Configuração e instância do cliente Prisma

- **📂 `src/enums/`** - 📝 **Constantes**
  - `HttpStatusCode.ts` - Códigos de status HTTP padronizados

### 🎯 **Tipagem e Padronização**

- **📂 `src/types/`** - 🏷️ **Tipos Personalizados do Prisma**
  - Padroniza tipos complexos do Prisma pelo projeto
  - Define tipos customizados com relacionamentos específicos
  - Exemplo: `ProfissionalCompletions` - Tipo que inclui profissional com comentários e likes
  - Facilita reutilização de tipos em services, controllers, repositories e DAOs

### 🚀 **Arquivos de Entrada**

- **📄 `src/app.ts`** - 🏭 Configuração principal da aplicação Express
- **📄 `src/server.ts`** - 🌐 Inicialização e configuração do servidor

## 🛠️ Tecnologias Utilizadas

### 🚀 Tecnologias Principais

| 🚀 **Tecnologia** | 📖 **Descrição**                                                       | 🔗 **Link de Acesso**                         |
| ----------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| 🟢 Node.js        | Ambiente de execução de JavaScript para várias plataformas (≥20.0.0)   | [Node.js](https://nodejs.org/pt)              |
| ⚡ ExpressJS      | Framework para Node.js que facilita a criação de aplicações web e APIs | [ExpressJS](https://expressjs.com/pt-br/)     |
| 🟦 TypeScript     | Superset do JavaScript que adiciona tipos estáticos ao código          | [TypeScript](https://www.typescriptlang.org/) |
| 🌀 Prisma         | ORM (Object-Relational Mapping) para Node.js e TypeScript              | [Prisma](https://www.prisma.io/)              |
| ⚙️ pnpm           | Gerenciador de pacotes rápido e eficiente para JavaScript              | [pnpm](https://pnpm.io/)                      |

### 📦 Dependências de Produção

| 📚 **Biblioteca**    | 📖 **Versão** | 📖 **Descrição**                                                             | 🔗 **Link**                                                            |
| -------------------- | ------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `@prisma/client`     | `^6.15.0`     | Cliente Prisma para acesso ao banco de dados                                 | [Prisma Client](https://www.prisma.io/client)                          |
| `axios`              | `^1.11.0`     | Cliente HTTP baseado em promises para requisições                            | [Axios](https://axios-http.com/)                                       |
| `bcryptjs`           | `^3.0.2`      | Biblioteca para hash de senhas com bcrypt                                    | [bcryptjs](https://www.npmjs.com/package/bcryptjs)                     |
| `brasilapi-js`       | `^1.0.4`      | Cliente JavaScript para a BrasilAPI - API gratuita com informações do Brasil | [BrasilAPI JS](https://brasilapi.com.br/)                              |
| `chalk`              | `^5.6.0`      | Biblioteca para estilizar texto no terminal com cores e formatação           | [Chalk](https://www.npmjs.com/package/chalk)                           |
| `compression`        | `^1.8.1`      | Middleware de compressão para Express                                        | [Compression](https://www.npmjs.com/package/compression)               |
| `cors`               | `^2.8.5`      | Middleware para habilitar CORS (Cross-Origin Resource Sharing)               | [CORS](https://www.npmjs.com/package/cors)                             |
| `express`            | `^5.1.0`      | Framework web rápido e minimalista para Node.js                              | [Express](https://expressjs.com/)                                      |
| `express-rate-limit` | `^8.0.1`      | Middleware de limitação de taxa para Express                                 | [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) |
| `helmet`             | `^8.1.0`      | Middleware de segurança para Express                                         | [Helmet](https://helmetjs.github.io/)                                  |
| `jsonwebtoken`       | `^9.0.2`      | Implementação de JSON Web Tokens para autenticação                           | [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)             |
| `zod`                | `^3.25.76`    | Biblioteca de validação de schema TypeScript-first                           | [Zod](https://zod.dev/)                                                |

### 🛠️ Dependências de Desenvolvimento

| 📚 **Biblioteca**     | 📖 **Versão** | 📖 **Descrição**                                             | 🔗 **Link**                                                             |
| --------------------- | ------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `@eslint/js`          | `^9.34.0`     | Configurações JavaScript oficiais do ESLint                  | [ESLint JS](https://eslint.org/)                                        |
| `@faker-js/faker`     | `^10.0.0`     | Biblioteca para geração de dados falsos realistas            | [Faker.js](https://fakerjs.dev/)                                        |
| `@types/compression`  | `^1.8.1`      | Definições de tipos TypeScript para compression              | [Types Compression](https://www.npmjs.com/package/@types/compression)   |
| `@types/cors`         | `^2.8.19`     | Definições de tipos TypeScript para cors                     | [Types CORS](https://www.npmjs.com/package/@types/cors)                 |
| `@types/express`      | `^5.0.3`      | Definições de tipos TypeScript para express                  | [Types Express](https://www.npmjs.com/package/@types/express)           |
| `@types/jsonwebtoken` | `^9.0.10`     | Definições de tipos TypeScript para jsonwebtoken             | [Types JsonWebToken](https://www.npmjs.com/package/@types/jsonwebtoken) |
| `@types/node`         | `^22.18.0`    | Definições de tipos TypeScript para Node.js                  | [Types Node](https://www.npmjs.com/package/@types/node)                 |
| `@types/semver`       | `^7.7.0`      | Definições de tipos TypeScript para semver                   | [Types Semver](https://www.npmjs.com/package/@types/semver)             |
| `dotenv`              | `^16.6.1`     | Carrega variáveis de ambiente de um arquivo .env             | [Dotenv](https://www.npmjs.com/package/dotenv)                          |
| `eslint`              | `^9.34.0`     | Ferramenta de linting para identificar problemas no código   | [ESLint](https://eslint.org/)                                           |
| `globals`             | `^16.3.0`     | Variáveis globais para ESLint em diferentes ambientes        | [Globals](https://www.npmjs.com/package/globals)                        |
| `prisma`              | `^6.15.0`     | Kit de ferramentas de banco de dados                         | [Prisma](https://www.prisma.io/)                                        |
| `rimraf`              | `^6.0.1`      | Utilitário para remoção de arquivos e pastas multiplataforma | [Rimraf](https://www.npmjs.com/package/rimraf)                          |
| `semver`              | `^7.7.2`      | Utilitário para trabalhar com versionamento semântico        | [Semver](https://www.npmjs.com/package/semver)                          |
| `tsc-alias`           | `^1.8.16`     | Resolve aliases do TypeScript após a compilação              | [TSC Alias](https://www.npmjs.com/package/tsc-alias)                    |
| `tsx`                 | `^4.20.5`     | Executor TypeScript/JSX de alta performance                  | [TSX](https://www.npmjs.com/package/tsx)                                |
| `typescript`          | `^5.9.2`      | Linguagem de programação que adiciona tipagem ao JavaScript  | [TypeScript](https://www.typescriptlang.org/)                           |
| `typescript-eslint`   | `^8.41.0`     | Integração entre TypeScript e ESLint                         | [TypeScript ESLint](https://typescript-eslint.io/)                      |

## ⚠️ Aviso Importante sobre Dependências

> **🚨 NÃO ATUALIZE AS DEPENDÊNCIAS DO PROJETO SEM NECESSIDADE REAL!**

### 📋 Por que não atualizar as dependências sem critério?

- **🔒 Estabilidade**: As versões atuais foram testadas e são compatíveis entre si
- **🐛 Bugs**: Versões mais novas podem introduzir bugs ou breaking changes
- **💥 Compatibilidade**: Atualizações podem quebrar a compatibilidade entre dependências
- **🔧 Configurações**: Mudanças podem exigir reconfiguração de ESLint, TypeScript, etc.
- **⏱️ Tempo de desenvolvimento**: Resolver problemas de compatibilidade consome tempo

### ✅ Quando é apropriado atualizar?

- **🔐 Correções de segurança críticas**
- **🐛 Bugs que afetam funcionalidades essenciais**
- **✨ Funcionalidades específicas necessárias para novos recursos**
- **📈 Melhorias significativas de performance**

### 🛡️ Como atualizar com segurança (se necessário)?

1. **📊 Teste em branch separada**
2. **📝 Documente as mudanças**
3. **🧪 Execute todos os testes**
4. **👥 Revise com a equipe**
5. **🔄 Tenha um plano de rollback**

## 🚀 Como Rodar o Projeto

### ⚠️ IMPORTANTE: Frontend e Integração

Este é o **backend (API)** do projeto. Para usar o sistema completo, você também precisará rodar o **frontend (painel administrativo)**.

- **🖥️ Repositório Frontend:** [Cidade Inclusiva - Frontend](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-front-end)
- **🔗 URL Padrão do Backend:** `http://localhost:5555`
- **🔗 URL Padrão do Frontend:** `http://localhost:3000`

### 📋 Passo a Passo Completo

#### 1️⃣ **Clone o repositório**

```bash
git clone https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end.git
cd cidade-inclusiva-adm-back-end
```

#### 2️⃣ **Mude para a branch de desenvolvimento**

```bash
git checkout development
```

#### 3️⃣ **Instale o pnpm (se não tiver)**

```bash
npm install -g pnpm
```

#### 4️⃣ **Configure as variáveis de ambiente**

> **⚠️ ATENÇÃO**: Esta etapa é **OBRIGATÓRIA** para o funcionamento do projeto!

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

**📝 Edite o arquivo `.env` e configure as variáveis obrigatórias:**

```bash
# ===== BANCO DE DADOS (OBRIGATÓRIO) =====
DATABASE_URL="file:./dev.db"  # SQLite para desenvolvimento
# Para produção, use PostgreSQL:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/cidade_inclusiva"

# ===== JWT (OBRIGATÓRIO) =====
# Gere uma chave segura com: pnpm generate-jwt-secret
JWT_SECRET="sua-chave-secreta-muito-longa-e-segura-aqui-minimo-32-caracteres"
JWT_EXPIRES_IN="7d"

# ===== SERVIDOR =====
NODE_ENV="development"  # development, test ou production
PORT=5555

# ===== CORS =====
ALLOWED_ORIGINS="http://localhost:3000"  # URL do frontend
```

#### 5️⃣ **Gere uma chave JWT segura**

```bash
pnpm generate-jwt-secret
```

Copie a chave gerada e cole no arquivo `.env` na variável `JWT_SECRET`.

#### 6️⃣ **Instale as dependências**

```bash
pnpm install
```

#### 7️⃣ **Configure o banco de dados**

```bash
# Execute as migrações
pnpm migrate

# (Opcional) Popule com dados de exemplo
pnpm seed
```

> **💡 Dica:** O comando `pnpm seed` cria dados realistas para teste, incluindo usuários, notícias, profissionais e muito mais!

#### 8️⃣ **Inicie o servidor de desenvolvimento**

```bash
pnpm dev
```

#### 9️⃣ **Verifique se está funcionando**

Abra seu navegador ou use curl/Postman para acessar:

```bash
http://localhost:5555
```

**Resultado:** Servidor API disponível em `http://localhost:5555` 🎉

### ✅ Verificação da Configuração

Para garantir que tudo está funcionando:

1. ✅ **Arquivo `.env` criado** - Verifique se o arquivo existe na raiz do projeto
2. ✅ **Variáveis obrigatórias configuradas** - `DATABASE_URL` e `JWT_SECRET` preenchidos
3. ✅ **JWT_SECRET válido** - Mínimo 32 caracteres (use `pnpm generate-jwt-secret`)
4. ✅ **Dependências instaladas** - Execute `pnpm install` sem erros
5. ✅ **Migrações aplicadas** - Execute `pnpm migrate` com sucesso
6. ✅ **Servidor rodando** - API acessível em `http://localhost:5555`
7. ✅ **Validação de ambiente** - Execute `pnpm validate-env` para verificar

### 🐛 Problemas Comuns

| ❌ **Problema**                       | ✅ **Solução**                                                                   |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| Erro `JWT_SECRET is required`         | Configure a variável no `.env` ou gere uma nova com `pnpm generate-jwt-secret`   |
| Erro `DATABASE_URL is required`       | Adicione `DATABASE_URL="file:./dev.db"` no arquivo `.env`                        |
| Erro de migração do Prisma            | Execute `pnpm migrate` novamente ou `pnpm push` para aplicar mudanças            |
| Porta 5555 já em uso                  | Altere a porta no `.env`: `PORT=5556` ou mate o processo que está usando a porta |
| Erro ao instalar dependências         | Limpe o cache: `pnpm store prune` e execute `pnpm install` novamente             |
| Erro de CORS no frontend              | Adicione a URL do frontend em `ALLOWED_ORIGINS` no `.env`                        |
| Erro "Node version is not compatible" | Instale Node.js ≥20.0.0: [nodejs.org](https://nodejs.org)                        |
| Seed falha em produção                | O seed é bloqueado em produção por segurança. Use apenas em desenvolvimento      |

### 🔧 Comandos Úteis para Desenvolvimento

```bash
# Visualizar e editar dados do banco em interface web
pnpm studio

# Verificar status das migrações
pnpm status

# Aplicar mudanças de schema sem criar migração
pnpm push

# Sincronizar schema com banco existente
pnpm pull

# Validar todas as variáveis de ambiente
pnpm validate-env

# Validar apenas configurações JWT
pnpm validate-jwt

# Limpar arquivos de build e temporários
pnpm clean

# Verificar código com ESLint
pnpm lint

# Compilar para produção
pnpm build

# Executar versão de produção
pnpm start
```

### 🔄 Workflow Completo de Desenvolvimento

Para começar a desenvolver no projeto:

1. **Configure o ambiente** (passos 1-7 acima)
2. **Inicie o servidor:** `pnpm dev`
3. **Abra o Prisma Studio** (em outro terminal): `pnpm studio`
4. **Faça suas alterações** no código
5. **Se alterou o schema do Prisma:**
   - Execute: `pnpm migrate` (cria nova migração)
   - Ou: `pnpm push` (aplica direto sem migração)
6. **Verifique seu código:** `pnpm lint`
7. **Teste a API** com Postman, Insomnia ou curl

### 🚀 Deploy e Produção

Antes de fazer deploy:

```bash
# 1. Valide o ambiente
pnpm validate-env

# 2. Execute o linting
pnpm lint

# 3. Compile o projeto
pnpm build

# 4. Configure .env de produção com:
#    - NODE_ENV=production
#    - DATABASE_URL do PostgreSQL
#    - JWT_SECRET seguro e diferente do dev
#    - ALLOWED_ORIGINS com domínio real

# 5. Execute as migrações em produção
pnpm migrate

# 6. Inicie o servidor
pnpm start
```

> **⚠️ NUNCA execute `pnpm seed` em produção!** O script é bloqueado automaticamente por segurança.

## 📋 Requisitos do Sistema

### 💻 Requisitos Mínimos

- **Node.js:** ≥20.0.0 (LTS recomendado)
- **Gerenciador de pacotes:** pnpm ≥8.0.0 (recomendado) ou npm ≥9.0.0
- **Sistema operacional:** Windows 10+, macOS 12+, ou Linux (Ubuntu 20.04+)
- **Memória RAM:** Mínimo 4GB (8GB recomendado)
- **Espaço em disco:** Mínimo 500MB livres

### 🗄️ Banco de Dados

**Desenvolvimento:**

- SQLite 3 (incluído, sem instalação necessária)

**Produção:**

- PostgreSQL ≥14.0 (recomendado)
- MySQL ≥8.0 (suportado)
- Outros bancos compatíveis com Prisma

### 🛠️ Ferramentas Recomendadas

- **Editor de código:** VS Code, WebStorm ou similar
- **Cliente de API:** Postman, Insomnia ou Thunder Client
- **Git:** Para controle de versão
- **Terminal:** Git Bash (Windows), Terminal nativo (macOS/Linux)

### 🌐 Integrações Necessárias

- **Frontend:** [Cidade Inclusiva - Painel Administrativo](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-front-end)
- **BrasilAPI:** Para dados de CEP e localização (API pública, sem chave necessária)

## 📚 Recursos Adicionais

### 📖 Documentação Técnica

- **[Prisma Docs](https://www.prisma.io/docs)** - Documentação oficial do Prisma ORM
- **[Express.js Guide](https://expressjs.com/pt-br/guide/routing.html)** - Guia oficial do Express
- **[Zod Documentation](https://zod.dev/)** - Validação de schemas TypeScript
- **[JWT.io](https://jwt.io/)** - Ferramenta para debug de tokens JWT

### 🎓 Guias e Tutoriais

- **Estrutura do Projeto:** Veja a seção [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- **Variáveis de Ambiente:** Veja a seção [🔍 Validação de Variáveis de Ambiente](#-validação-de-variáveis-de-ambiente)
- **Scripts Disponíveis:** Veja a seção [⚡ Scripts Disponíveis](#-scripts-disponíveis)

### 🔗 Links Úteis

- **Repositório Backend:** [GitHub - Backend](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end)
- **Repositório Frontend:** [GitHub - Frontend](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-front-end)
- **Repositório Mobile:** [GitHub - Mobile](https://github.com/marcosrogerio-jrf/fundect-pictec3-mobile-cidade-inclusiva)
- **Protótipo:** [Vercel - Mobile](https://fundect-pictec3-mobile-cidade-inclusiva.vercel.app/login)

## 🎯 Funcionalidades Principais

### 🏗️ Arquitetura e Desenvolvimento

- ✅ **API RESTful** completa para gerenciamento de dados
- ✅ **Arquitetura em camadas** (Controllers, Services, Repositories, DAOs)
- ✅ **Injeção de dependências** para melhor manutenibilidade
- ✅ **Validação de dados** robusta com Zod schemas
- ✅ **TypeScript** completo para tipagem estática e melhor DX
- ✅ **Hot-reload** em desenvolvimento com tsx watch
- ✅ **Build otimizado** com TypeScript compiler e tsc-alias

### 🗄️ Banco de Dados e ORM

- ✅ **ORM Prisma** moderno para acesso ao banco de dados
- ✅ **Migrações automatizadas** com versionamento completo
- ✅ **Seed inteligente** com proteções de segurança contra produção
- ✅ **Prisma Studio** para visualização e edição de dados
- ✅ **SQLite** para desenvolvimento e **PostgreSQL** para produção
- ✅ **Soft Delete** para desativar registros sem removê-los fisicamente do banco de dados, garantindo rastreabilidade, histórico completo e recuperação controlada de informações.

### 🔐 Segurança e Autenticação

- ✅ **Autenticação JWT** com jsonwebtoken para sessões seguras
- ✅ **Hash de senhas** com bcryptjs (salt rounds configuráveis)
- ✅ **Rate Limiting** para proteção contra spam e ataques DDoS
- ✅ **Helmet** para proteção com headers de segurança HTTP
- ✅ **CORS configurável** para controle de origins permitidas
- ✅ **Validação de ambiente** para prevenir execuções acidentais

### 🌐 Integração e Performance

- ✅ **Integração BrasilAPI** para dados geográficos brasileiros
- ✅ **Compressão de respostas** para melhor performance
- ✅ **Logs coloridos** com chalk para melhor DX
- ✅ **Timeout configurável** para requisições HTTP
- ✅ **Axios** para requisições HTTP externas

### 🛠️ Qualidade e Manutenção

- ✅ **ESLint** com zero tolerância a warnings
- ✅ **Scripts de limpeza** automatizados
- ✅ **Verificação de versão Node.js** (>=20.0.0)
- ✅ **Validação completa de variáveis de ambiente**
- ✅ **Geração segura de JWT secrets**
- ✅ **Semver** para versionamento e compatibilidade

---

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

> **Cidade Inclusiva** - Construindo uma cidade mais acessível para todos! 🌆♿

🎉 **Agora você está pronto para contribuir com o projeto Cidade Inclusiva!**
