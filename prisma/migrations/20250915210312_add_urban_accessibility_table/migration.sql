/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Manutencao` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "AcessibilidadeUrbana" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AcessibilidadeUrbanaRecurso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "simbolo" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "acessibilidadeUrbanaId" TEXT NOT NULL,
    CONSTRAINT "AcessibilidadeUrbanaRecurso_acessibilidadeUrbanaId_fkey" FOREIGN KEY ("acessibilidadeUrbanaId") REFERENCES "AcessibilidadeUrbana" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comentario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "visivel" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "profissionalId" TEXT,
    "motoristaId" TEXT,
    "manutencaoId" TEXT,
    "acessibilidadeUrbanaId" TEXT,
    CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comentario_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_acessibilidadeUrbanaId_fkey" FOREIGN KEY ("acessibilidadeUrbanaId") REFERENCES "AcessibilidadeUrbana" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("atualizadoEm", "conteudo", "criadoEm", "id", "profissionalId", "usuarioId", "visivel") SELECT "atualizadoEm", "conteudo", "criadoEm", "id", "profissionalId", "usuarioId", "visivel" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
CREATE INDEX "Comentario_usuarioId_idx" ON "Comentario"("usuarioId");
CREATE INDEX "Comentario_profissionalId_idx" ON "Comentario"("profissionalId");
CREATE TABLE "new_Endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL DEFAULT 'Brasil',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "usuarioId" TEXT,
    "manutencaoId" TEXT,
    "acessibilidadeUrbanaId" TEXT,
    CONSTRAINT "Endereco_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Endereco_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Endereco_acessibilidadeUrbanaId_fkey" FOREIGN KEY ("acessibilidadeUrbanaId") REFERENCES "AcessibilidadeUrbana" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("atualizadoEm", "bairro", "cep", "cidade", "complemento", "criadoEm", "estado", "id", "logradouro", "manutencaoId", "numero", "pais", "usuarioId") SELECT "atualizadoEm", "bairro", "cep", "cidade", "complemento", "criadoEm", "estado", "id", "logradouro", "manutencaoId", "numero", "pais", "usuarioId" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE UNIQUE INDEX "Endereco_usuarioId_key" ON "Endereco"("usuarioId");
CREATE UNIQUE INDEX "Endereco_manutencaoId_key" ON "Endereco"("manutencaoId");
CREATE UNIQUE INDEX "Endereco_acessibilidadeUrbanaId_key" ON "Endereco"("acessibilidadeUrbanaId");
CREATE TABLE "new_Foto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "noticiaId" TEXT,
    "profissionalId" TEXT,
    "usuarioId" TEXT,
    "motoristaId" TEXT,
    "veiculoId" TEXT,
    "manutencaoId" TEXT,
    "manutencaoLogoId" TEXT,
    "acessibilidadeUrbanaId" TEXT,
    "acessibilidadeUrbanaLogoId" TEXT,
    CONSTRAINT "Foto_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_manutencaoLogoId_fkey" FOREIGN KEY ("manutencaoLogoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_acessibilidadeUrbanaId_fkey" FOREIGN KEY ("acessibilidadeUrbanaId") REFERENCES "AcessibilidadeUrbana" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_acessibilidadeUrbanaLogoId_fkey" FOREIGN KEY ("acessibilidadeUrbanaLogoId") REFERENCES "AcessibilidadeUrbana" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Foto" ("atualizadoEm", "criadoEm", "id", "manutencaoId", "manutencaoLogoId", "motoristaId", "noticiaId", "profissionalId", "url", "usuarioId", "veiculoId") SELECT "atualizadoEm", "criadoEm", "id", "manutencaoId", "manutencaoLogoId", "motoristaId", "noticiaId", "profissionalId", "url", "usuarioId", "veiculoId" FROM "Foto";
DROP TABLE "Foto";
ALTER TABLE "new_Foto" RENAME TO "Foto";
CREATE UNIQUE INDEX "Foto_noticiaId_key" ON "Foto"("noticiaId");
CREATE UNIQUE INDEX "Foto_profissionalId_key" ON "Foto"("profissionalId");
CREATE UNIQUE INDEX "Foto_usuarioId_key" ON "Foto"("usuarioId");
CREATE UNIQUE INDEX "Foto_motoristaId_key" ON "Foto"("motoristaId");
CREATE UNIQUE INDEX "Foto_manutencaoLogoId_key" ON "Foto"("manutencaoLogoId");
CREATE UNIQUE INDEX "Foto_acessibilidadeUrbanaLogoId_key" ON "Foto"("acessibilidadeUrbanaLogoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AcessibilidadeUrbana_telefone_key" ON "AcessibilidadeUrbana"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "AcessibilidadeUrbana_email_key" ON "AcessibilidadeUrbana"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Manutencao_telefone_key" ON "Manutencao"("telefone");
