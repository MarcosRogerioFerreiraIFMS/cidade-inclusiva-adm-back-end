# 🌆 Projeto Cidade Inclusiva - Painel Administrativo - API

O **Cidade Inclusiva - Painel Administrativo - API** é uma aplicação backend desenvolvida para gerenciar e fornecer suporte à iniciativa **Cidade Inclusiva**, que visa melhorar a mobilidade urbana para cadeirantes. Este projeto utiliza tecnologias modernas para garantir eficiência, segurança e escalabilidade, permitindo que os administradores gerenciem dados e funcionalidades de forma intuitiva e confiável.

## 📋 Informações do Projeto

- **Nome:** cidade-inclusiva-adm-back-end
- **Versão:** 1.0.0
- **Descrição:** API do sistema Cidade Inclusiva
- **Node.js:** >=20.0.0 (versão mínima requerida)
- **Ponto de entrada:** dist/src/server.js

## 📚 Documentação de Apoio

| 📄 Descrição | 🔗 Link |
|:---|:---|
| 📝 Desenvolvimento do Plano de Trabalho | [Plano de Trabalho](https://docs.google.com/document/d/1nRhvRcXlDFgf7TtoWgm3VRqlIvhKTE5sb9miVpVaVKU/edit?usp=sharing) |
| 📄 Documentação do Projeto Mobile | [Documentação Cidade Inclusiva](https://docs.google.com/document/d/1VxejBnzkMbvmlPWUQOMgSNrHDl5ugXdu/edit?usp=sharing) |
| 🎨 Protótipo Inicial no Figma | [Figma](https://www.figma.com/design/sHp0ryMHBTla6oVVEYJSOv) |
| 📱 Protótipo Mobile no Vercel | [Cidade Inclusiva - Mobile](https://fundect-pictec3-mobile-cidade-inclusiva.vercel.app/login) |
| 🛠️ Modelagem UML do Projeto | [Cidade Inclusiva - UML](https://app.diagrams.net/#G1c72Gns79DE7laBVADoPoukr65F1AaNS-) |
| 📂 Repositório Mobile no GitHub | [Cidade Inclusiva - Mobile](https://github.com/marcosrogerio-jrf/fundect-pictec3-mobile-cidade-inclusiva) |

## ⚡ Scripts Disponíveis

### 🚀 Scripts de Execução

| 📜 **Script** | 📖 **Descrição** | 🏃‍♂️ **Comando** |
|---------------|------------------|-------------------|
| `dev` | Inicia o servidor em modo de desenvolvimento com hot-reload usando tsx | `pnpm dev` |
| `start` | Inicia o servidor em modo de produção (requer build) | `pnpm start` |
| `build` | Compila o código TypeScript para JavaScript na pasta `dist/` | `pnpm build` |

### 🗄️ Scripts do Banco de Dados (Prisma)

| 📜 **Script** | 📖 **Descrição** | 🏃‍♂️ **Comando** |
|---------------|------------------|-------------------|
| `migrate` | Executa as migrações do banco de dados em modo desenvolvimento | `pnpm migrate` |
| `seed` | Popula o banco de dados com dados iniciais realistas usando logs coloridos e informativos | `pnpm seed` |
| `studio` | Abre o Prisma Studio para visualizar e editar dados do banco | `pnpm studio` |
| `push` | Aplica mudanças do schema diretamente no banco (sem criar migrações) | `pnpm push` |
| `pull` | Puxa o schema do banco de dados para o arquivo `prisma/schema.prisma` | `pnpm pull` |
| `status` | Mostra o status das migrações do banco de dados | `pnpm status` |

### 🔧 Scripts de Sistema

| 📜 **Script** | 📖 **Descrição** | 🏃‍♂️ **Comando** |
|---------------|------------------|-------------------|
| `lint` | Executa o ESLint para verificar problemas no código TypeScript | `pnpm lint` |
| `build:noEmit` | Verifica a compilação TypeScript sem gerar arquivos de saída | `pnpm build:noEmit` |
| `check` | Verifica a compilação e linting do código | `pnpm check` |
| `clean` | Remove pastas de build, temporárias e coverage | `pnpm clean` |
| `generate-jwt-secret` | Gera uma chave secreta JWT para autenticação | `pnpm generate-jwt-secret` |
| `validate-env` | **Valida variáveis de ambiente**: verifica se todas as configurações necessárias estão presentes | `pnpm validate-env` |
| `validate-jwt` | **Validação específica do JWT**: verifica configurações de autenticação e segurança JWT | `pnpm validate-jwt` |

### 📝 Explicação Detalhada dos Scripts

#### 🚀 Scripts de Desenvolvimento

- **`dev`**: Utiliza o `tsx` em modo watch para monitorar mudanças no código TypeScript e reiniciar automaticamente o servidor. Ideal para desenvolvimento.
- **`build`**: Compila todo o código TypeScript para JavaScript, criando os arquivos na pasta `dist/`.
- **`start`**: Executa a versão compilada da aplicação (arquivo `dist/src/server.js`). Usado em produção.

#### 🗃️ Scripts do Prisma

- **`migrate`**: Executa `prisma migrate dev` para aplicar migrações pendentes ao banco de dados de desenvolvimento.
- **`seed`**: Executa o arquivo `prisma/seed.ts` para popular o banco com dados iniciais realistas e bem estruturados, incluindo usuários com endereços reais (via BrasilAPI), profissionais, notícias categorizadas, comentários e likes. O processo inclui logs coloridos e informativos que mostram o progresso detalhado e estatísticas finais.
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
  - **📄 `schema.prisma`** - 🎯 Estrutura das tabelas
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

| 🚀 **Tecnologia** | 📖 **Descrição** | 🔗 **Link de Acesso** |
|-------------------|------------------|-----------------------|
| 🟢 Node.js       | Ambiente de execução de JavaScript para várias plataformas (≥20.0.0) | [Node.js](https://nodejs.org/pt) |
| ⚡ ExpressJS     | Framework para Node.js que facilita a criação de aplicações web e APIs | [ExpressJS](https://expressjs.com/pt-br/) |
| 🟦 TypeScript    | Superset do JavaScript que adiciona tipos estáticos ao código | [TypeScript](https://www.typescriptlang.org/) |
| 🌀 Prisma        | ORM (Object-Relational Mapping) para Node.js e TypeScript | [Prisma](https://www.prisma.io/) |
| ⚙️ pnpm          | Gerenciador de pacotes rápido e eficiente para JavaScript | [pnpm](https://pnpm.io/) |

### 📦 Dependências de Produção

| 📚 **Biblioteca** | 📖 **Versão** | 📖 **Descrição** | 🔗 **Link** |
|-------------------|---------------|------------------|-------------|
| `@prisma/client` | `^6.15.0` | Cliente Prisma para acesso ao banco de dados | [Prisma Client](https://www.prisma.io/client) |
| `@types/jsonwebtoken` | `^9.0.10` | Definições de tipos TypeScript para jsonwebtoken | [Types JsonWebToken](https://www.npmjs.com/package/@types/jsonwebtoken) |
| `axios` | `^1.11.0` | Cliente HTTP baseado em promises para requisições | [Axios](https://axios-http.com/) |
| `bcryptjs` | `^3.0.2` | Biblioteca para hash de senhas com bcrypt | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| `brasilapi-js` | `^1.0.4` | Cliente JavaScript para a BrasilAPI - API gratuita com informações do Brasil | [BrasilAPI JS](https://brasilapi.com.br/) |
| `chalk` | `^5.6.0` | Biblioteca para estilizar texto no terminal com cores e formatação | [Chalk](https://www.npmjs.com/package/chalk) |
| `compression` | `^1.8.1` | Middleware de compressão para Express | [Compression](https://www.npmjs.com/package/compression) |
| `cors` | `^2.8.5` | Middleware para habilitar CORS (Cross-Origin Resource Sharing) | [CORS](https://www.npmjs.com/package/cors) |
| `express` | `^5.1.0` | Framework web rápido e minimalista para Node.js | [Express](https://expressjs.com/) |
| `express-rate-limit` | `^8.0.1` | Middleware de limitação de taxa para Express | [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) |
| `helmet` | `^8.1.0` | Middleware de segurança para Express | [Helmet](https://helmetjs.github.io/) |
| `jsonwebtoken` | `^9.0.2` | Implementação de JSON Web Tokens para autenticação | [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) |
| `zod` | `^3.25.76` | Biblioteca de validação de schema TypeScript-first | [Zod](https://zod.dev/) |

### 🛠️ Dependências de Desenvolvimento

| 📚 **Biblioteca** | 📖 **Versão** | 📖 **Descrição** | 🔗 **Link** |
|-------------------|---------------|------------------|-------------|
| `@eslint/js` | `^9.34.0` | Configurações JavaScript oficiais do ESLint | [ESLint JS](https://eslint.org/) |
| `@faker-js/faker` | `^10.0.0` | Biblioteca para geração de dados falsos realistas | [Faker.js](https://fakerjs.dev/) |
| `@types/compression` | `^1.8.1` | Definições de tipos TypeScript para compression | [Types Compression](https://www.npmjs.com/package/@types/compression) |
| `@types/cors` | `^2.8.19` | Definições de tipos TypeScript para cors | [Types CORS](https://www.npmjs.com/package/@types/cors) |
| `@types/express` | `^5.0.3` | Definições de tipos TypeScript para express | [Types Express](https://www.npmjs.com/package/@types/express) |
| `@types/node` | `^22.18.0` | Definições de tipos TypeScript para Node.js | [Types Node](https://www.npmjs.com/package/@types/node) |
| `@types/semver` | `^7.7.0` | Definições de tipos TypeScript para semver | [Types Semver](https://www.npmjs.com/package/@types/semver) |
| `dotenv` | `^16.6.1` | Carrega variáveis de ambiente de um arquivo .env | [Dotenv](https://www.npmjs.com/package/dotenv) |
| `eslint` | `^9.34.0` | Ferramenta de linting para identificar problemas no código | [ESLint](https://eslint.org/) |
| `globals` | `^16.3.0` | Variáveis globais para ESLint em diferentes ambientes | [Globals](https://www.npmjs.com/package/globals) |
| `prisma` | `^6.15.0` | Kit de ferramentas de banco de dados | [Prisma](https://www.prisma.io/) |
| `rimraf` | `^6.0.1` | Utilitário para remoção de arquivos e pastas multiplataforma | [Rimraf](https://www.npmjs.com/package/rimraf) |
| `semver` | `^7.7.2` | Utilitário para trabalhar com versionamento semântico | [Semver](https://www.npmjs.com/package/semver) |
| `tsx` | `^4.20.5` | Executor TypeScript/JSX de alta performance | [TSX](https://www.npmjs.com/package/tsx) |
| `typescript` | `^5.9.2` | Linguagem de programação que adiciona tipagem ao JavaScript | [TypeScript](https://www.typescriptlang.org/) |
| `typescript-eslint` | `^8.41.0` | Integração entre TypeScript e ESLint | [TypeScript ESLint](https://typescript-eslint.io/) |

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

### ⚡ Método Rápido: Configuração Automática

Este é o método mais simples e recomendado para iniciantes:

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end.git
    ```

2. **Acesse o diretório do projeto:**

    ```bash
    cd cidade-inclusiva-adm-back-end
    ```

3. **Instale o pnpm (se não tiver):**

    ```bash
    npm install -g pnpm
    ```

4. **Instale as dependências e configure o projeto:**

    ```bash
    pnpm install
    ```

5. **Configure o banco de dados:**

    ```bash
    pnpm migrate
    ```

6. **Popule o banco com dados iniciais (opcional):**

    ```bash
    pnpm seed
    ```

7. **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm dev
    ```

**Resultado:** Servidor disponível em `http://localhost:5555` 🎉

### 🛠️ Método Manual: Controle Total

Para desenvolvedores que preferem executar cada etapa individualmente:

1. **Clone e acesse o projeto:**

    ```bash
    git clone https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end.git
    cd cidade-inclusiva-adm-back-end
    ```

2. **Instale as dependências:**

    ```bash
    # Instalar pnpm (se necessário)
    npm install -g pnpm
    
    # Instalar dependências do projeto
    pnpm install
    ```

3. **Configure o banco de dados:**

    ```bash
    # Executar migrações
    pnpm migrate
    
    # Popular com dados iniciais (opcional)
    pnpm seed
    ```

4. **Inicie o servidor:**

    ```bash
    # Desenvolvimento (com hot-reload)
    pnpm dev
    
    # OU Produção (requer build primeiro)
    pnpm build
    pnpm start
    ```

### 🔧 Comandos Úteis para Desenvolvimento

```bash
# Visualizar dados do banco
pnpm studio

# Verificar status das migrações
pnpm status

# Aplicar mudanças de schema sem migração
pnpm push

# Sincronizar schema com banco existente
pnpm pull
```

## 📋 Requisitos do Sistema

- **Node.js:** ≥20.0.0
- **Gerenciador de pacotes:** pnpm (recomendado) ou npm
- **Sistema operacional:** Windows, macOS ou Linux
- **Banco de dados:** SQLite (desenvolvimento) ou PostgreSQL (produção)

## 🎯 Funcionalidades Principais

- ✅ **API RESTful** completa para gerenciamento de dados
- ✅ **Validação de dados** com Zod
- ✅ **ORM Prisma** para acesso ao banco de dados
- ✅ **TypeScript** para tipagem estática
- ✅ **Hot-reload** em desenvolvimento
- ✅ **Migrações de banco** automatizadas
- ✅ **Seed de dados** otimizado para desenvolvimento com logs coloridos
- ✅ **CORS** configurado para requisições cross-origin
- ✅ **Integração BrasilAPI** para dados geográficos do Brasil
- ✅ **Autenticação JWT** com jsonwebtoken para sessões seguras
- ✅ **Hash de senhas** com bcryptjs para segurança
- ✅ **Rate Limiting** para proteção contra spam e ataques DDoS
- ✅ **Helmet** para proteção com headers de segurança
- ✅ **Compressão** de respostas para melhor performance
- ✅ **Logs coloridos** com chalk para melhor experiência de desenvolvimento

---

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

> **Cidade Inclusiva** - Construindo uma cidade mais acessível para todos! 🌆♿

🎉 **Agora você está pronto para contribuir com o projeto Cidade Inclusiva!**
