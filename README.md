# 🌆 Projeto Cidade Inclusiva - Painel Administrativo - API

O **Cidade Inclusiva - Painel Administrativo - API** é uma aplicação backend desenvolvida para gerenciar e fornecer suporte à iniciativa **Cidade Inclusiva**, que visa melhorar a mobilidade urbana para cadeirantes. Este projeto utiliza tecnologias modernas para garantir eficiência, segurança e escalabilidade, permitindo que os administradores gerenciem dados e funcionalidades de forma intuitiva e confiável.

## 📚 Documentação de Apoio

| 📄 Descrição | 🔗 Link |
|:---|:---|
| 📝 Desenvolvimento do Plano de Trabalho | [Plano de Trabalho](https://docs.google.com/document/d/1nRhvRcXlDFgf7TtoWgm3VRqlIvhKTE5sb9miVpVaVKU/edit?usp=sharing) |
| 📄 Documentação do Projeto Mobile | [Documentação Cidade Inclusiva](https://docs.google.com/document/d/1VxejBnzkMbvmlPWUQOMgSNrHDl5ugXdu/edit?usp=sharing) |
| 🎨 Protótipo Inicial no Figma | [Figma](https://www.figma.com/design/sHp0ryMHBTla6oVVEYJSOv) |
| 📱 Protótipo Mobile no Vercel | [Cidade Inclusiva - Mobile](https://fundect-pictec3-mobile-cidade-inclusiva.vercel.app/login) |
| 🛠️ Modelagem UML do Projeto | [Cidade Inclusiva - UML](https://app.diagrams.net/#G1c72Gns79DE7laBVADoPoukr65F1AaNS-) |
| 📂 Repositório Mobile no GitHub | [Cidade Inclusiva - Mobile](https://github.com/marcosrogerio-jrf/fundect-pictec3-mobile-cidade-inclusiva) |

## 📑 Documentação do Projeto

| 📄 Descrição | 🔗 Link |
|:---|:---|
| 🗂️ Esquema do Banco de Dados | [SCHEMA.md](docs/SCHEMA.md) |
| 🗂️ Documentação da Estrutura de Pastas | [FOLDERS.md](docs/FOLDERS.md) |

## 🛠️ Tecnologias Utilizadas

| 🚀 **Tecnologia** | 📖 **Descrição** | 🔗 **Link de Acesso** |
|-------------------|------------------|-----------------------|
| 🟢 Node.js       | Ambiente de execução de JavaScript para várias plataformas. | [Node.js](https://nodejs.org/pt) |
| ⚡ ExpressJS     | Framework para Node.js que facilita a criação de aplicações web e APIs. | [ExpressJS](https://expressjs.com/pt-br/) |
| 🟦 TypeScript    | Superset do JavaScript que adiciona tipos estáticos ao código. | [TypeScript](https://www.typescriptlang.org/) |
| 🌀 Prisma        | ORM (Object-Relational Mapping) para Node.js e TypeScript. | [Prisma](https://www.prisma.io/) |
| 🔒 JWT           | Método para representar claims entre duas partes. | [JWT](https://jwt.io/) |
| 🔑 bcryptjs      | Biblioteca para hashing de senhas. | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| ⚙️ pnpm          | Gerenciador de pacotes rápido e eficiente para JavaScript. | [pnpm](https://pnpm.io/) |

### 🧹 Ferramentas de Linting

Lista de ferramentas de linting utilizadas no projeto:

| 🛠️ **Ferramenta** | 📖 **Descrição** | 🔗 **Link de Acesso** |
|--------------------|------------------|-----------------------|
| 🛡️ ESLint        | Ferramenta de linting para identificar e corrigir problemas em código JavaScript/TypeScript. | [ESLint](https://eslint.org/) |
| ✨ Prettier      | Ferramenta de formatação de código que garante um estilo consistente. | [Prettier](https://prettier.io/) |

## 🚀 Como Rodar o Projeto

### 🌟 Método Simplificado: Um Comando para Tudo

1. **Clone o repositório:**

    ```sh
    git clone https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end.git
    ```

2. **Acesse o diretório do projeto:**

    ```sh
    cd cidade-inclusiva-adm-back-end
    ```

3. **Finalize com um único comando**

    Caso não tenha o pnpm instalado, execute:

    ```sh
    npm install -g pnpm
    ```

    Em seguida, com o comando abaixo, você pode preparar e rodar o projeto com apenas uma linha:

    ```sh
    pnpm first
    ```

Este comando realiza automaticamente as seguintes etapas:

1. **📦 Instala todas as dependências do projeto:**  
    O comando instala automaticamente todas as bibliotecas e pacotes necessários para o funcionamento do projeto.

2. **🗄️ Monta o banco de dados:**  
    Configura o banco de dados aplicando todas as migrações definidas no projeto.

3. **🌱 Executa o seed:**  
    Popula o banco de dados com os dados iniciais necessários para o funcionamento da aplicação.

4. **🚀 Inicia o servidor de desenvolvimento:**  
    Levanta o servidor localmente, tornando a aplicação acessível em `http://localhost:5555`.

Após executar o comando, o servidor estará disponível em `http://localhost:5555`. 🎉

### 🛠️ Método Manual: Passo a Passo

Caso prefira realizar as etapas manualmente, siga os passos abaixo para rodar o projeto localmente:

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

    Em seguida, instale as dependências:

    ```sh
    pnpm i
    ```

4. **🗄️ Monte o banco de dados e execute o seed:**  

    Para configurar o banco de dados aplicando todas as migrações definidas no projeto e popular automaticamente com os dados iniciais, execute:  

    ```sh
    pnpm migrate
    ```

5. **🚀 Inicie a aplicação:**

    ```sh
    pnpm dev
    ```

O servidor será iniciado em `http://localhost:5555`. 🌐

---

<p align="center">
  <img width="200" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js logo">
</p>

> **Node.js®** é um ambiente de execução de JavaScript disponível para várias plataformas, de código aberto e gratuito, que permite aos programadores criar servidores, aplicações web, ferramentas de linha de comando e programas de automação de tarefas.

<p align="center">
    <img width="200" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original-wordmark.svg" alt="Prisma logo">
</p>

> **Prisma** é um ORM (Object-Relational Mapping) para Node.js e TypeScript que facilita o acesso ao banco de dados, permitindo consultas eficientes e seguras, além de migrações e gerenciamento de esquemas de forma intuitiva.

<p align="center">
    <img width="200" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="ExpressJS logo">
</p>

> **ExpressJS** é um framework para Node.js que facilita a criação de aplicações web e APIs, fornecendo uma série de funcionalidades robustas para o desenvolvimento de servidores e serviços web.

🎉 **Agora você está pronto para contribuir com o projeto Cidade Inclusiva!**
