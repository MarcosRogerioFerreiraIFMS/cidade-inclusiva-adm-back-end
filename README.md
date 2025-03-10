# Projeto Cidade Inclusiva - Painel Administrativo - API

Este projeto é a API do Cidade Inclusiva, uma iniciativa para melhorar a mobilidade urbana de cadeirantes.

## Documentação de Apoio

| Descrição | Link |
|-----------|------|
| Desenvolvimento do Plano de Trabalho | [Plano de Trabalho](https://docs.google.com/document/d/1nRhvRcXlDFgf7TtoWgm3VRqlIvhKTE5sb9miVpVaVKU/edit?tab=t.0) |

## Tecnologias Utilizadas

| Tecnologia | Descrição | Link de Acesso |
|------------|-----------|----------------|
| Node.js    | Ambiente de execução de JavaScript para várias plataformas. | [Node.js](https://nodejs.org/pt) |
| ExpressJS  | Framework para Node.js que facilita a criação de aplicações web e APIs. | [ExpressJS](https://expressjs.com/pt-br/) |
| TypeScript | Superset do JavaScript que adiciona tipos estáticos ao código. | [TypeScript](https://www.typescriptlang.org/) |
| Prisma     | ORM (Object-Relational Mapping) para Node.js e TypeScript. | [Prisma](https://www.prisma.io/) |
| JWT        | Método para representar claims entre duas partes. | [JWT](https://jwt.io/) |
| bcryptjs   | Biblioteca para hashing de senhas. | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| pnpm | Gerenciador de pacotes rápido e eficiente para JavaScript. | [pnpm](https://pnpm.io/) |

### Ferramentas de Linting

Lista de ferramentas de linting utilizadas no projeto:

| Ferramenta | Descrição | Link de Acesso |
|:---|:---|:---|
| ESLint | Ferramenta de linting para identificar e corrigir problemas em código JavaScript/TypeScript. | [ESLint](https://eslint.org/) |
| Prettier | Ferramenta de formatação de código que garante um estilo consistente. | [Prettier](https://prettier.io/) |

### Como Rodar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**

    ```sh
    git clone https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end.git
    ```

2. **Acesse o diretório do projeto:**

    ```sh
    cd cidade-inclusiva-adm-back-end
    ```

3. **Instale as dependências:**

    Caso não tenha o pnpm instalado, execute:

    ```sh
    npm install -g pnpm
    ```

    ```sh
    pnpm i
    ```

4. **Execute a aplicação:**

    ```sh
    pnpm dev
    ```

O servidor será iniciado em `http://localhost:5555`.

### Montar Banco de Dados

**Atenção:** É crucial montar o banco de dados corretamente, pois problemas nesta etapa podem impedir o funcionamento do seed.

Para montar o banco de dados, execute o comando abaixo:

```sh
pnpm migrate
```

### Executar Seed do Prisma

Depois de montar o banco de dados, é importante verificar se todas as migrações foram aplicadas corretamente. Para isso, execute o comando abaixo:

```sh
pnpm status
```

Este comando exibirá o status das migrações e ajudará a identificar se há alguma pendente ou com problemas.
Para popular o banco de dados com dados iniciais utilizando o Prisma, execute o comando abaixo:

```sh
pnpm seed
```

<p align="center">
  <img width="200" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js logo">
</p>

> Node.js® é um ambiente de execução de JavaScript disponível para várias plataformas, de código aberto e gratuito, que permite aos programadores criar servidores, aplicações web, ferramentas de linha de comando e programas de automação de tarefas.

<p align="center">
    <img width="200" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original-wordmark.svg" alt="Prisma logo">
</p>

> Prisma é um ORM (Object-Relational Mapping) para Node.js e TypeScript que facilita o acesso ao banco de dados, permitindo consultas eficientes e seguras, além de migrações e gerenciamento de esquemas de forma intuitiva.

<p align="center">
    <img width="200" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="ExpressJS logo">
</p>

> ExpressJS é um framework para Node.js que facilita a criação de aplicações web e APIs, fornecendo uma série de funcionalidades robustas para o desenvolvimento de servidores e serviços web.
