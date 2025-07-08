# Estrutura de Pastas

Neste documento, será explicado o significado e a finalidade de cada pasta presente na estrutura do projeto.

## 📂 /docs

A pasta `docs` contém toda a documentação relacionada ao projeto, incluindo guias de uso, especificações técnicas e informações sobre a arquitetura do sistema.

## 📂 /node_modules

A pasta `node_modules` contém todas as dependências do projeto instaladas via npm ou pnpm. É aqui que você encontrará todas as bibliotecas e pacotes necessários para o funcionamento da aplicação. Esta pasta é gerada automaticamente quando você instala as dependências e não deve ser modificada manualmente.

## 📂 /prisma

A pasta `prisma` é onde estão localizados os arquivos de configuração do Prisma, incluindo o esquema do banco de dados, seeds e migrações. O Prisma é um ORM (Object-Relational Mapping) que facilita a interação com o banco de dados, permitindo consultas eficientes e seguras, além de gerenciar esquemas e migrações de forma intuitiva. É fundamental para a integração entre a aplicação e o banco de dados.

### 📂 /prisma/migrations

A subpasta `migrations` dentro de `prisma` contém os arquivos de migração do banco de dados. Cada migração representa uma alteração no esquema do banco de dados, permitindo que você acompanhe e aplique mudanças de forma controlada.

## 📁 /src

A pasta `src` é o coração do projeto, onde reside todo o código-fonte da aplicação. É aqui que você encontrará a lógica de negócios, as rotas, os controladores e os serviços que compõem a funcionalidade principal do sistema.

### 📂 /src/controllers

A subpasta `controllers` dentro de `src` contém os controladores da aplicação, que são responsáveis por gerenciar as requisições e respostas, além de orquestrar a lógica de negócios.

### 📂 /src/daos

A subpasta `daos` dentro de `src` contém os Data Access Objects (DAOs) da aplicação, que são responsáveis pela interação com a camada de persistência de dados, como bancos de dados ou APIs externas. Os DAOs encapsulam a lógica de acesso a dados, permitindo que os serviços se concentrem na lógica de negócios.

### 📂 /src/dtos

A subpasta `dtos` dentro de `src` contém os Data Transfer Objects (DTOs) da aplicação, que são utilizados para definir a estrutura dos dados que são enviados e recebidos pela API. Os DTOs ajudam a garantir que os dados estejam no formato correto e facilitam a validação e a documentação da API.

#### Tipos de DTOs

- **DTOs de Criação (`src/dtos/create`)**: Definem a estrutura dos dados necessários para criar novos recursos na aplicação. Esses DTOs são utilizados nas requisições de criação, garantindo que os dados estejam completos e válidos antes de serem processados.

- **DTOs de Atualização (`src/dtos/update`)**: Definem a estrutura dos dados necessários para atualizar recursos existentes na aplicação. Esses DTOs são utilizados nas requisições de atualização, permitindo que apenas os campos relevantes sejam modificados, mantendo a integridade dos dados.

- **DTOs de Resposta (`src/dtos/response`)**: Definem a estrutura dos dados que serão retornados nas respostas da API. Esses DTOs garantem que as respostas estejam formatadas corretamente e contenham todas as informações necessárias para o cliente.

### 📂 /src/enums

A subpasta `enums` dentro de `src` contém as definições de enums da aplicação, que são utilizados para representar conjuntos de valores nomeados. Os enums ajudam a tornar o código mais legível e a evitar erros ao trabalhar com valores fixos.

### 📂 /src/interfaces

A subpasta `interfaces` dentro de `src` contém as definições de interfaces da aplicação, que são utilizadas para definir contratos entre diferentes partes do código. As interfaces ajudam a garantir que os objetos implementem as propriedades e métodos esperados, promovendo a consistência e a reutilização de código.

#### Tipos de Interfaces

- **Interfaces de DAOS (`src/interfaces/daos`)**: Definem os métodos que os DAOs devem implementar para acessar e manipular os dados. Essas interfaces garantem que os DAOs sigam um contrato específico, facilitando a manutenção e a testabilidade do código.

- **Interfaces de Repositórios (`src/interfaces/repositories`)**: Definem os métodos que os repositórios devem implementar para acessar e manipular os dados. Essas interfaces ajudam a desacoplar a lógica de negócios da camada de persistência, promovendo a reutilização de código e facilitando a testabilidade.

### 📂 /src/lib

A subpasta `lib` dentro de `src` contém bibliotecas e módulos reutilizáveis que podem ser utilizados em toda a aplicação. Esses módulos podem incluir funções utilitárias, configurações de terceiros ou qualquer outro código que precise ser compartilhado entre diferentes partes da aplicação.

### 📂 /src/mappers

A subpasta `mappers` dentro de `src` contém os mapeadores da aplicação, que são responsáveis por converter dados entre diferentes formatos ou estruturas. Os mapeadores ajudam a transformar objetos de domínio em DTOs e vice-versa, facilitando a comunicação entre as camadas da aplicação.

#### Tipos de Mapeadores

- **Mapeadores de Entrada (`src/mappers/input`)**: Responsáveis por transformar os dados recebidos nas requisições em DTOs. Garantem que os dados estejam no formato esperado antes de serem processados pelos controladores e serviços, facilitando a validação e padronização das informações de entrada.

- **Mapeadores de Saída (`src/mappers/output`)**: Responsáveis por converter os DTOs gerados pelos serviços em formatos adequados para as respostas da API. Asseguram que os dados enviados ao cliente estejam estruturados corretamente e de acordo com as especificações da interface pública do sistema.

### 📂 /src/repositories

A subpasta `repositories` dentro de `src` contém os repositórios da aplicação, que são responsáveis por encapsular a lógica de acesso a dados e fornecer uma interface para interagir com os DAOs. Os repositórios ajudam a desacoplar a lógica de negócios da camada de persistência, promovendo a reutilização de código e facilitando a testabilidade.

### 📂 /src/routes

A subpasta `routes` dentro de `src` contém as definições de rotas da aplicação, que mapeiam as URLs para os controladores correspondentes.

### 📂 /src/schemas

A subpasta `schemas` dentro de `src` contém os esquemas de validação da aplicação, que são utilizados para garantir que os dados recebidos nas requisições estejam no formato correto e atendam aos requisitos esperados. Os esquemas ajudam a validar e sanitizar os dados antes de serem processados pelos controladores e serviços.

### 📂 /src/services

A subpasta `services` dentro de `src` contém os serviços da aplicação, que encapsulam a lógica de negócios e a interação com o banco de dados, promovendo a reutilização de código e a separação de responsabilidades.

### 📂 /src/utils

A subpasta `utils` dentro de `src` contém funções e utilitários auxiliares que podem ser utilizados em toda a aplicação, como formatação de dados, validações e manipulação de strings.

### 📂 /src/middlewares

A subpasta `middlewares` dentro de `src` contém os middlewares da aplicação, que são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware na cadeia (next). Os middlewares são usados para executar código, modificar a requisição e a resposta, encerrar a requisição ou chamar o próximo middleware na pilha.
