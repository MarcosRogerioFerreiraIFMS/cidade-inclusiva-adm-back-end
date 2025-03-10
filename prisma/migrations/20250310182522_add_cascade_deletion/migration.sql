/*
  Warnings:

  - The primary key for the `Acessibilidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoriaAcessibilidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoriaProfissional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comentario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Endereco` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Especialidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Mobilidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Noticia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profissional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Recurso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RegraValidacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ServicoManutencao` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Acessibilidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "enderecoId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "Acessibilidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Acessibilidade_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaAcessibilidade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Acessibilidade" ("categoriaId", "email", "enderecoId", "foto", "id", "nome", "telefone") SELECT "categoriaId", "email", "enderecoId", "foto", "id", "nome", "telefone" FROM "Acessibilidade";
DROP TABLE "Acessibilidade";
ALTER TABLE "new_Acessibilidade" RENAME TO "Acessibilidade";
CREATE TABLE "new_CategoriaAcessibilidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_CategoriaAcessibilidade" ("id", "nome") SELECT "id", "nome" FROM "CategoriaAcessibilidade";
DROP TABLE "CategoriaAcessibilidade";
ALTER TABLE "new_CategoriaAcessibilidade" RENAME TO "CategoriaAcessibilidade";
CREATE UNIQUE INDEX "CategoriaAcessibilidade_nome_key" ON "CategoriaAcessibilidade"("nome");
CREATE TABLE "new_CategoriaProfissional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_CategoriaProfissional" ("id", "nome") SELECT "id", "nome" FROM "CategoriaProfissional";
DROP TABLE "CategoriaProfissional";
ALTER TABLE "new_CategoriaProfissional" RENAME TO "CategoriaProfissional";
CREATE UNIQUE INDEX "CategoriaProfissional_nome_key" ON "CategoriaProfissional"("nome");
CREATE TABLE "new_Comentario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "like" INTEGER NOT NULL DEFAULT 0,
    "comentario" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("comentario", "id", "like", "usuarioId") SELECT "comentario", "id", "like", "usuarioId" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
CREATE TABLE "new_Endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);
INSERT INTO "new_Endereco" ("bairro", "cep", "estado", "id", "numero", "rua") SELECT "bairro", "cep", "estado", "id", "numero", "rua" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE TABLE "new_Especialidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL
);
INSERT INTO "new_Especialidade" ("descricao", "id") SELECT "descricao", "id" FROM "Especialidade";
DROP TABLE "Especialidade";
ALTER TABLE "new_Especialidade" RENAME TO "Especialidade";
CREATE TABLE "new_Mobilidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "ocorrencia" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "Mobilidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Mobilidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Mobilidade" ("data", "enderecoId", "id", "latitude", "longitude", "ocorrencia", "status", "usuarioId") SELECT "data", "enderecoId", "id", "latitude", "longitude", "ocorrencia", "status", "usuarioId" FROM "Mobilidade";
DROP TABLE "Mobilidade";
ALTER TABLE "new_Mobilidade" RENAME TO "Mobilidade";
CREATE TABLE "new_Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "foto" TEXT,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "Noticia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaNoticia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Noticia" ("categoriaId", "conteudo", "data", "foto", "id", "titulo", "url") SELECT "categoriaId", "conteudo", "data", "foto", "id", "titulo", "url" FROM "Noticia";
DROP TABLE "Noticia";
ALTER TABLE "new_Noticia" RENAME TO "Noticia";
CREATE TABLE "new_Profissional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "Profissional_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaProfissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profissional" ("categoriaId", "email", "foto", "id", "nome", "telefone") SELECT "categoriaId", "email", "foto", "id", "nome", "telefone" FROM "Profissional";
DROP TABLE "Profissional";
ALTER TABLE "new_Profissional" RENAME TO "Profissional";
CREATE UNIQUE INDEX "Profissional_email_key" ON "Profissional"("email");
CREATE TABLE "new_Recurso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "acessibilidade" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
INSERT INTO "new_Recurso" ("acessibilidade", "descricao", "id") SELECT "acessibilidade", "descricao", "id" FROM "Recurso";
DROP TABLE "Recurso";
ALTER TABLE "new_Recurso" RENAME TO "Recurso";
CREATE TABLE "new_RegraValidacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_RegraValidacao" ("campo", "id", "tipo") SELECT "campo", "id", "tipo" FROM "RegraValidacao";
DROP TABLE "RegraValidacao";
ALTER TABLE "new_RegraValidacao" RENAME TO "RegraValidacao";
CREATE TABLE "new_ServicoManutencao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "logo" TEXT,
    "foto" TEXT,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "ServicoManutencao_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ServicoManutencao" ("email", "enderecoId", "foto", "id", "logo", "nome", "telefone") SELECT "email", "enderecoId", "foto", "id", "logo", "nome", "telefone" FROM "ServicoManutencao";
DROP TABLE "ServicoManutencao";
ALTER TABLE "new_ServicoManutencao" RENAME TO "ServicoManutencao";
CREATE TABLE "new_Veiculo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,
    CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Veiculo" ("id", "marca", "modelo", "motoristaId", "placa") SELECT "id", "marca", "modelo", "motoristaId", "placa" FROM "Veiculo";
DROP TABLE "Veiculo";
ALTER TABLE "new_Veiculo" RENAME TO "Veiculo";
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");
CREATE TABLE "new__EspecialidadeToServicoManutencao" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EspecialidadeToServicoManutencao_A_fkey" FOREIGN KEY ("A") REFERENCES "Especialidade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EspecialidadeToServicoManutencao_B_fkey" FOREIGN KEY ("B") REFERENCES "ServicoManutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__EspecialidadeToServicoManutencao" ("A", "B") SELECT "A", "B" FROM "_EspecialidadeToServicoManutencao";
DROP TABLE "_EspecialidadeToServicoManutencao";
ALTER TABLE "new__EspecialidadeToServicoManutencao" RENAME TO "_EspecialidadeToServicoManutencao";
CREATE UNIQUE INDEX "_EspecialidadeToServicoManutencao_AB_unique" ON "_EspecialidadeToServicoManutencao"("A", "B");
CREATE INDEX "_EspecialidadeToServicoManutencao_B_index" ON "_EspecialidadeToServicoManutencao"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
