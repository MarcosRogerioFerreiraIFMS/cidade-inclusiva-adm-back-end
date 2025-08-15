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
| `first` | **Script completo**: instala dependências, executa migrações e inicia o dev | `pnpm first` |

### 🗄️ Scripts do Banco de Dados (Prisma)

| 📜 **Script** | 📖 **Descrição** | 🏃‍♂️ **Comando** |
|---------------|------------------|-------------------|
| `migrate` | Executa as migrações do banco de dados em modo desenvolvimento | `pnpm migrate` |
| `seed` | Popula o banco de dados com dados iniciais definidos em `prisma/seed.ts` | `pnpm seed` |
| `studio` | Abre o Prisma Studio para visualizar e editar dados do banco | `pnpm studio` |
| `push` | Aplica mudanças do schema diretamente no banco (sem criar migrações) | `pnpm push` |
| `pull` | Puxa o schema do banco de dados para o arquivo `prisma/schema.prisma` | `pnpm pull` |
| `status` | Mostra o status das migrações do banco de dados | `pnpm status` |

### 🔧 Scripts de Sistema

| 📜 **Script** | 📖 **Descrição** | 🏃‍♂️ **Comando** |
|---------------|------------------|-------------------|
| `preinstall` | **Script automático**: verifica se a versão do Node.js é compatível (≥20.0.0) | *Executado automaticamente* |
| `lint` | Executa o ESLint para verificar problemas no código TypeScript | `pnpm lint` |
| `check` | Verifica a compilação e linting do código | `pnpm check` |
| `clean` | Remove pastas de build, temporárias e coverage | `pnpm clean` |

### 📝 Explicação Detalhada dos Scripts

#### 🔄 Scripts Automáticos

- **`preinstall`**: Este script é executado automaticamente pelo pnpm antes de instalar qualquer dependência. Ele verifica se a versão do Node.js é compatível (≥20.0.0) usando o arquivo `scripts/check-node-version.ts`.

#### 🚀 Scripts de Desenvolvimento

- **`dev`**: Utiliza o `tsx` em modo watch para monitorar mudanças no código TypeScript e reiniciar automaticamente o servidor. Ideal para desenvolvimento.
- **`build`**: Compila todo o código TypeScript para JavaScript, criando os arquivos na pasta `dist/`.
- **`start`**: Executa a versão compilada da aplicação (arquivo `dist/src/server.js`). Usado em produção.

#### 🎯 Script Completo

- **`first`**: Um script conveniente que executa três comandos em sequência:
  1. `pnpm install` - Instala todas as dependências
  2. `pnpm migrate` - Executa as migrações do banco
  3. `pnpm dev` - Inicia o servidor de desenvolvimento

#### 🗃️ Scripts do Prisma

- **`migrate`**: Executa `prisma migrate dev` para aplicar migrações pendentes ao banco de dados de desenvolvimento.
- **`seed`**: Executa o arquivo `prisma/seed.ts` para popular o banco com dados iniciais.
- **`studio`**: Abre uma interface web para visualizar e editar dados do banco de dados.
- **`push`**: Aplica mudanças do schema diretamente no banco sem criar arquivos de migração.
- **`pull`**: Sincroniza o schema do Prisma com a estrutura atual do banco de dados.
- **`status`**: Mostra informações sobre o estado das migrações.

#### 🔧 Scripts de Qualidade e Manutenção

- **`lint`**: Executa o ESLint em todos os arquivos TypeScript (.ts) com zero tolerância a warnings. Identifica problemas de código, estilo e potenciais bugs.
- **`check`**: Script de verificação completa que executa compilação TypeScript (sem gerar arquivos) e linting. Ideal para CI/CD.
- **`clean`**: Remove pastas de build (`dist/`), temporárias (`temp/`) e de coverage (`coverage/`). Limpa o projeto para um novo build.

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura bem organizada e modular, baseada em três entidades principais: **Comentários**, **Notícias** e **Profissionais**.

### 🗄️ **Banco de Dados**

- **📂 `prisma/`** - Configurações do banco de dados
  - **📂 `migrations/`** - 🔄 Controle de versões do banco
  - **📄 `schema.prisma`** - 🎯 Estrutura das tabelas
  - **📄 `seed.ts`** - 🌱 Dados iniciais para desenvolvimento

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

### � **Transformação de Dados**

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

- **📂 `src/utils/`** - 🛠️ **Funções Auxiliares** (5 arquivos)
  - `HandleError.ts` / `HandleSuccess.ts` - Padronização de respostas
  - `HttpError.ts` - Classe customizada para erros HTTP
  - `stringUtils.ts` / `urlUtils.ts` - Utilitários gerais

- **📂 `src/lib/`** - 📚 **Bibliotecas Compartilhadas**
  - `prisma.ts` - Configuração e instância do cliente Prisma

- **📂 `src/enums/`** - 📝 **Constantes**
  - `HttpStatusCode.ts` - Códigos de status HTTP padronizados

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

| 📚 **Biblioteca** | 📖 **Descrição** | 🔗 **Link** |
|-------------------|------------------|-------------|
| `@prisma/client` | Cliente Prisma para acesso ao banco de dados | [Prisma Client](https://www.prisma.io/client) |
| `axios` | Cliente HTTP baseado em promises para requisições | [Axios](https://axios-http.com/) |
| `cors` | Middleware para habilitar CORS (Cross-Origin Resource Sharing) | [CORS](https://www.npmjs.com/package/cors) |
| `express` | Framework web rápido e minimalista para Node.js | [Express](https://expressjs.com/) |
| `zod` | Biblioteca de validação de schema TypeScript-first | [Zod](https://zod.dev/) |

### 🛠️ Dependências de Desenvolvimento

| 📚 **Biblioteca** | 📖 **Descrição** | 🔗 **Link** |
|-------------------|------------------|-------------|
| `@eslint/js` | Configurações JavaScript oficiais do ESLint | [ESLint JS](https://eslint.org/) |
| `@types/*` | Definições de tipos TypeScript para várias bibliotecas | [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |
| `dotenv` | Carrega variáveis de ambiente de um arquivo .env | [Dotenv](https://www.npmjs.com/package/dotenv) |
| `eslint` | Ferramenta de linting para identificar problemas no código | [ESLint](https://eslint.org/) |
| `globals` | Variáveis globais para ESLint em diferentes ambientes | [Globals](https://www.npmjs.com/package/globals) |
| `prisma` | Kit de ferramentas de banco de dados | [Prisma](https://www.prisma.io/) |
| `rimraf` | Utilitário para remoção de arquivos e pastas multiplataforma | [Rimraf](https://www.npmjs.com/package/rimraf) |
| `semver` | Utilitário para trabalhar com versionamento semântico | [Semver](https://www.npmjs.com/package/semver) |
| `tsx` | Executor TypeScript/JSX de alta performance | [TSX](https://www.npmjs.com/package/tsx) |
| `typescript` | Linguagem de programação que adiciona tipagem ao JavaScript | [TypeScript](https://www.typescriptlang.org/) |
| `typescript-eslint` | Integração entre TypeScript e ESLint | [TypeScript ESLint](https://typescript-eslint.io/) |

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

### ⚡ Método Rápido: Um Comando para Tudo

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

4. **Execute o comando completo:**

    ```bash
    pnpm first
    ```

✨ **O que o comando `pnpm first` faz automaticamente:**

1. 📦 **Instala todas as dependências** (`pnpm install`)
2. 🗄️ **Configura o banco de dados** (`pnpm migrate`)
3. 🌱 **Popula com dados iniciais** (seed automático)
4. 🚀 **Inicia o servidor de desenvolvimento** (`pnpm dev`)

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
- ✅ **Seed de dados** para desenvolvimento
- ✅ **CORS** configurado para requisições cross-origin

---

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

> **Cidade Inclusiva** - Construindo uma cidade mais acessível para todos! 🌆♿

🎉 **Agora você está pronto para contribuir com o projeto Cidade Inclusiva!**
