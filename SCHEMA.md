# 📄 Documentação do Schema do Projeto Cidade Inclusiva

Este documento fornece uma visão detalhada do schema do banco de dados utilizado no projeto Cidade Inclusiva, explicando cada entidade, seus atributos e exemplos de uso.

## 1. Usuário 👤

### 📝 Descrição do Usuário

Representa um usuário da plataforma, que pode interagir com o sistema, como postar comentários e reportar problemas de mobilidade.

### 📋 Atributos do Usuário

- `id`: `String` (UUID, Primary Key) - Identificador único do usuário.
- `nome`: `String` - Nome completo do usuário.
- `telefone`: `String?` - Número de telefone do usuário (opcional).
- `foto`: `String?` - URL da foto do usuário (opcional).
- `email`: `String` (Unique) - Endereço de email do usuário (único).
- `senha`: `String` - Senha do usuário.

### 🔗 Relações do Usuário

- `comentarios`: `Comentario[]` - Lista de comentários feitos pelo usuário.
- `mobilidades`: `Mobilidade[]` - Lista de reportes de mobilidade feitos pelo usuário.

### 📦 Exemplo do Usuário

```json
{
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "nome": "José da Silva",
    "telefone": "11987654321",
    "foto": "https://randomuser.me/api/portraits/men/1.jpg",
    "email": "jose.silva@example.com",
    "senha": "senha123"
}
```

## 2. Motorista 🚗

### 📝 Descrição do Motorista

Representa um motorista que utiliza a plataforma, possivelmente para serviços de transporte acessível.

### 📋 Atributos do Motorista

- `id`: `String` (UUID, Primary Key) - Identificador único do motorista.
- `nome`: `String` - Nome completo do motorista.
- `telefone`: `String?` - Número de telefone do motorista (opcional).
- `email`: `String` (Unique) - Endereço de email do motorista (único).
- `foto`: `String?` - URL da foto do motorista (opcional).

### 🔗 Relações do Motorista

- `veiculos`: `Veiculo[]` - Lista de veículos associados ao motorista.

### 📦 Exemplo do Motorista

```json
{
    "id": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
    "nome": "Maria Souza",
    "telefone": "11998765432",
    "email": "maria.souza@example.com",
    "foto": "https://randomuser.me/api/portraits/women/1.jpg"
}
```

## 3. Veículo 🚙

### 📝 Descrição do Veículo

Representa um veículo associado a um motorista.

### 📋 Atributos do Veículo

- `id`: `String` (UUID, Primary Key) - Identificador único do veículo.
- `placa`: `String` (Unique) - Placa do veículo (única).
- `marca`: `String` - Marca do veículo.
- `modelo`: `String` - Modelo do veículo.
- `motoristaId`: `String` - ID do motorista associado ao veículo (Foreign Key).

### 🔗 Relações do Veículo

- `motorista`: `Motorista` - Motorista associado ao veículo.

### 📦 Exemplo do Veículo

```json
{
    "id": "98765432-a1b2-3c4d-5e6f-78901234abcd",
    "placa": "ABC1234",
    "marca": "Fiat",
    "modelo": "Uno",
    "motoristaId": "f1e2d3c4-b5a6-7890-1234-567890abcdef"
}
```

## 4. Comentário 💬

### 📝 Descrição do Comentário

Representa um comentário feito por um usuário em alguma parte da plataforma.

### 📋 Atributos do Comentário

- `id`: `String` (UUID, Primary Key) - Identificador único do comentário.
- `like`: `Int` - Número de "likes" que o comentário recebeu.
- `comentario`: `String` - Conteúdo do comentário.
- `usuarioId`: `String` - ID do usuário que fez o comentário (Foreign Key).

### 🔗 Relações do Comentário

- `usuario`: `Usuario` - Usuário que fez o comentário.

### 📦 Exemplo do Comentário

```json
{
    "id": "fedcba98-7654-3210-fedc-ba9876543210",
    "like": 5,
    "comentario": "Amei a iniciativa!",
    "usuarioId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```

## 5. Notícia 📰

### 📝 Descrição da Notícia

Representa uma notícia ou artigo informativo na plataforma.

### 📋 Atributos da Notícia

- `id`: `String` (UUID, Primary Key) - Identificador único da notícia.
- `titulo`: `String` - Título da notícia.
- `conteudo`: `String` - Conteúdo da notícia.
- `data`: `DateTime` - Data de criação da notícia.
- `dataPublicacao`: `DateTime` - Data de publicação da notícia.
- `url`: `String?` - URL da notícia (opcional).
- `foto`: `String?` - URL da foto da notícia (opcional).
- `categoriaId`: `String` - ID da categoria da notícia (Foreign Key).

### 🔗 Relações da Notícia

- `categoria`: `CategoriaNoticia` - Categoria da notícia.

### 📦 Exemplo da Notícia

```json
{
    "id": "1a2b3c4d-5e6f-7890-1234-567890abcdef",
    "titulo": "Nova rampa de acesso na Av. Paulista",
    "conteudo": "Instalação de rampa facilita acesso de cadeirantes.",
    "data": "2024-01-01T00:00:00.000Z",
    "dataPublicacao": "2024-01-02T00:00:00.000Z",
    "url": "https://www.cidadeinclusiva.com.br/noticias/",
    "foto": "https://source.unsplash.com/random",
    "categoriaId": "ca0a9a87-4c72-4292-879a-4a8c4c5c6c7c"
}
```

## 6. CategoriaNoticia 🗂️

### 📝 Descrição da CategoriaNoticia

Representa a categoria à qual uma notícia pertence.

### 📋 Atributos da CategoriaNoticia

- `id`: `String` (UUID, Primary Key) - Identificador único da categoria.
- `nome`: `String` (Unique) - Nome da categoria (único).

### 🔗 Relações da CategoriaNoticia

- `noticias`: `Noticia[]` - Lista de notícias associadas a esta categoria.

### 📦 Exemplo da CategoriaNoticia

```json
{
    "id": "ca0a9a87-4c72-4292-879a-4a8c4c5c6c7c",
    "nome": "Acessibilidade"
}
```

## 7. Profissional 👩‍⚕️

### 📝 Descrição do Profissional

Representa um profissional (e.g., advogado, psicólogo) que oferece serviços na plataforma.

### 📋 Atributos do Profissional

- `id`: `String` (UUID, Primary Key) - Identificador único do profissional.
- `nome`: `String` - Nome do profissional.
- `foto`: `String` - URL da foto do profissional.
- `telefone`: `String` - Número de telefone do profissional.
- `email`: `String` (Unique) - Endereço de email do profissional (único).
- `categoriaId`: `String` - ID da categoria do profissional (Foreign Key).

### 🔗 Relações do Profissional

- `categoria`: `CategoriaProfissional` - Categoria do profissional.

### 📦 Exemplo do Profissional

```json
{
    "id": "b1c2d3e4-f5a6-7890-1234-567890abcdef",
    "nome": "Ana Paula",
    "foto": "https://randomuser.me/api/portraits/women/10.jpg",
    "telefone": "11977776661",
    "email": "ana.paula1@example.com",
    "categoriaId": "cb1b0b98-5d83-43a3-98b0-5b9d5b6b7b8b"
}
```

## 8. CategoriaProfissional 🏷️

### 📝 Descrição da CategoriaProfissional

Representa a categoria à qual um profissional pertence.

### 📋 Atributos da CategoriaProfissional

- `id`: `String` (UUID, Primary Key) - Identificador único da categoria.
- `nome`: `String` (Unique) - Nome da categoria (único).

### 🔗 Relações da CategoriaProfissional

- `profissionais`: `Profissional[]` - Lista de profissionais associados a esta categoria.

### 📦 Exemplo da CategoriaProfissional

```json
{
    "id": "cb1b0b98-5d83-43a3-98b0-5b9d5b6b7b8b",
    "nome": "Advogado"
}
```

## 9. Acessibilidade 🏢

### 📝 Descrição da Acessibilidade

Representa um local acessível, como um prédio com rampas ou elevadores.

### 📋 Atributos da Acessibilidade

- `id`: `String` (UUID, Primary Key) - Identificador único do local acessível.
- `nome`: `String` - Nome do local acessível.
- `foto`: `String?` - URL da foto do local acessível (opcional).
- `telefone`: `String?` - Número de telefone do local acessível (opcional).
- `email`: `String?` - Endereço de email do local acessível (opcional).
- `enderecoId`: `String` - ID do endereço do local acessível (Foreign Key).
- `categoriaId`: `String` - ID da categoria de acessibilidade (Foreign Key).

### 🔗 Relações da Acessibilidade

- `endereco`: `Endereco` - Endereço do local acessível.
- `categoria`: `CategoriaAcessibilidade` - Categoria de acessibilidade.

### 📦 Exemplo da Acessibilidade

```json
{
    "id": "2a3b4c5d-6e7f-8901-2345-678901abcdef",
    "nome": "Rampa de acesso",
    "foto": "https://source.unsplash.com/random",
    "telefone": "1133334444",
    "email": "contato@acessibilidade.com",
    "enderecoId": "ed9c8b7a-6f5e-4d3c-2b1a-0a9b8c7d6e5f",
    "categoriaId": "cc2c1c09-6a94-44b4-99a1-6c8d7e9f0a1b"
}
```

## 10. CategoriaAcessibilidade 🏷️

### 📝 Descrição da CategoriaAcessibilidade

Representa a categoria de um recurso de acessibilidade.

### 📋 Atributos da CategoriaAcessibilidade

- `id`: `String` (UUID, Primary Key) - Identificador único da categoria.
- `nome`: `String` (Unique) - Nome da categoria (único).

### 🔗 Relações da CategoriaAcessibilidade

- `acessibilidades`: `Acessibilidade[]` - Lista de recursos de acessibilidade associados a esta categoria.

### 📦 Exemplo da CategoriaAcessibilidade

```json
{
    "id": "cc2c1c09-6a94-44b4-99a1-6c8d7e9f0a1b",
    "nome": "Rampas"
}
```

## 11. ServicoManutencao 🛠️

### 📝 Descrição do ServicoManutencao

Representa um serviço de manutenção.

### 📋 Atributos do ServicoManutencao

- `id`: `String` (UUID, Primary Key) - Identificador único do serviço de manutenção.
- `nome`: `String` - Nome do serviço de manutenção.
- `telefone`: `String?` - Número de telefone do serviço de manutenção (opcional).
- `email`: `String?` - Endereço de email do serviço de manutenção (opcional).
- `logo`: `String?` - URL do logo do serviço de manutenção (opcional).
- `foto`: `String?` - URL da foto do serviço de manutenção (opcional).
- `enderecoId`: `String` - ID do endereço do serviço de manutenção (Foreign Key).

### 🔗 Relações do ServicoManutencao

- `endereco`: `Endereco` - Endereço do serviço de manutenção.
- `especialidades`: `Especialidade[]` - Lista de especialidades oferecidas pelo serviço.

### 📦 Exemplo do ServicoManutencao

```json
{
    "id": "3b4c5d6e-7f8a-9012-3456-789012abcdef",
    "nome": "Manutenção 1",
    "telefone": "1122223333",
    "email": "servico@manutencao.com",
    "logo": "https://source.unsplash.com/random",
    "foto": "https://source.unsplash.com/random",
    "enderecoId": "ed9c8b7a-6f5e-4d3c-2b1a-0a9b8c7d6e5f"
}
```

## 12. Especialidade 🧰

### 📝 Descrição da Especialidade

Representa uma especialidade de um serviço de manutenção.

### 📋 Atributos da Especialidade

- `id`: `String` (UUID, Primary Key) - Identificador único da especialidade.
- `descricao`: `String` - Descrição da especialidade.

### 🔗 Relações da Especialidade

- `servicos`: `ServicoManutencao[]` - Lista de serviços de manutenção que oferecem esta especialidade.

### 📦 Exemplo da Especialidade

```json
{
    "id": "4c5d6e7f-8a9b-0123-4567-890123abcdef",
    "descricao": "Elétrica"
}
```

## 13. Mobilidade 🛴

### 📝 Descrição da Mobilidade

Representa um reporte de problema de mobilidade.

### 📋 Atributos da Mobilidade

- `id`: `String` (UUID, Primary Key) - Identificador único do reporte de mobilidade.
- `latitude`: `Float` - Latitude da localização do problema.
- `longitude`: `Float` - Longitude da localização do problema.
- `ocorrencia`: `String` - Descrição da ocorrência.
- `data`: `DateTime` - Data e hora da ocorrência.
- `status`: `Status` (`PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDO`) - Status do reporte.
- `usuarioId`: `String` - ID do usuário que reportou o problema (Foreign Key).
- `enderecoId`: `String` - ID do endereço da ocorrência (Foreign Key).

### 🔗 Relações da Mobilidade

- `usuario`: `Usuario` - Usuário que reportou o problema.
- `endereco`: `Endereco` - Endereço da ocorrência.

### 📦 Exemplo da Mobilidade

```json
{
    "id": "5d6e7f8a-9b0c-2345-6789-012345abcdef",
    "latitude": -23.550520,
    "longitude": -46.633309,
    "ocorrencia": "Buraco na calçada",
    "data": "2024-01-01T12:00:00.000Z",
    "status": "PENDENTE",
    "usuarioId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "enderecoId": "ed9c8b7a-6f5e-4d3c-2b1a-0a9b8c7d6e5f"
}
```

## 14. Endereco 📍

### 📝 Descrição do Endereco

Representa um endereço.

### 📋 Atributos do Endereco

- `id`: `String` (UUID, Primary Key) - Identificador único do endereço.
- `rua`: `String` - Nome da rua.
- `numero`: `String` - Número do endereço.
- `bairro`: `String` - Nome do bairro.
- `cep`: `String` - Código postal.
- `estado`: `String` - Estado.

### 🔗 Relações do Endereco

- `mobilidades`: `Mobilidade[]` - Lista de reportes de mobilidade associados a este endereço.
- `acessibilidades`: `Acessibilidade[]` - Lista de locais acessíveis associados a este endereço.
- `servicos`: `ServicoManutencao[]` - Lista de serviços de manutenção associados a este endereço.

### 📦 Exemplo do Endereco

```json
{
    "id": "ed9c8b7a-6f5e-4d3c-2b1a-0a9b8c7d6e5f",
    "rua": "Avenida Paulista",
    "numero": "1000",
    "bairro": "Bela Vista",
    "cep": "01310-000",
    "estado": "SP"
}
```

## 15. Recurso 🛡️

### 📝 Descrição do Recurso

Representa um recurso de acessibilidade genérico.

### 📋 Atributos do Recurso

- `id`: `String` (UUID, Primary Key) - Identificador único do recurso.
- `acessibilidade`: `String` - Nome do recurso de acessibilidade.
- `descricao`: `String` - Descrição do recurso.

### 📦 Exemplo do Recurso

```json
{
    "id": "6e7f8a9b-0c1d-4567-8901-234567abcdef",
    "acessibilidade": "Rampa",
    "descricao": "Rampa de acesso para cadeirantes"
}
```

## 16. RegraValidacao ✅

### 📝 Descrição da RegraValidacao

Representa uma regra de validação para campos específicos.

### 📋 Atributos da RegraValidacao

- `id`: `String` (UUID, Primary Key) - Identificador único da regra de validação.
- `campo`: `String` - Nome do campo a ser validado.
- `tipo`: `String` - Tipo de validação (e.g., "string").

### 📦 Exemplo da RegraValidacao

```json
{
    "id": "7f8a9b0c-1d2e-5678-9012-345678abcdef",
    "campo": "nome",
    "tipo": "string"
}
```
