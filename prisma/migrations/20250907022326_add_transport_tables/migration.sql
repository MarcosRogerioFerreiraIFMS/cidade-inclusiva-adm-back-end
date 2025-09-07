/*
  Warnings:

  - You are about to drop the column `foto` on the `Noticia` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Profissional` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Motorista" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Foto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "noticiaId" TEXT,
    "ProfissionalId" TEXT,
    "usuarioId" TEXT,
    "veiculoId" TEXT,
    "motoristaId" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Foto_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_ProfissionalId_fkey" FOREIGN KEY ("ProfissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataPublicacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria" TEXT NOT NULL,
    "url" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Noticia" ("atualizadoEm", "categoria", "conteudo", "criadoEm", "dataPublicacao", "id", "titulo", "url") SELECT "atualizadoEm", "categoria", "conteudo", "criadoEm", "dataPublicacao", "id", "titulo", "url" FROM "Noticia";
DROP TABLE "Noticia";
ALTER TABLE "new_Noticia" RENAME TO "Noticia";
CREATE TABLE "new_Profissional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "fotoId" TEXT
);
INSERT INTO "new_Profissional" ("atualizadoEm", "criadoEm", "email", "especialidade", "id", "nome", "telefone") SELECT "atualizadoEm", "criadoEm", "email", "especialidade", "id", "nome", "telefone" FROM "Profissional";
DROP TABLE "Profissional";
ALTER TABLE "new_Profissional" RENAME TO "Profissional";
CREATE UNIQUE INDEX "Profissional_telefone_key" ON "Profissional"("telefone");
CREATE UNIQUE INDEX "Profissional_email_key" ON "Profissional"("email");
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'USUARIO',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "fotoId" TEXT
);
INSERT INTO "new_Usuario" ("atualizadoEm", "criadoEm", "email", "id", "nome", "senha", "telefone", "tipo") SELECT "atualizadoEm", "criadoEm", "email", "id", "nome", "senha", "telefone", "tipo" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_telefone_key" ON "Motorista"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_email_key" ON "Motorista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_motoristaId_key" ON "Veiculo"("motoristaId");

-- CreateIndex
CREATE UNIQUE INDEX "Foto_noticiaId_key" ON "Foto"("noticiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Foto_ProfissionalId_key" ON "Foto"("ProfissionalId");

-- CreateIndex
CREATE UNIQUE INDEX "Foto_usuarioId_key" ON "Foto"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Foto_motoristaId_key" ON "Foto"("motoristaId");
