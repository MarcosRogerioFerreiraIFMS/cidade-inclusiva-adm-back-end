/*
  Warnings:

  - You are about to drop the column `ProfissionalId` on the `Foto` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Manutencao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EspecialidadeManutencao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "manutencaoId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "EspecialidadeManutencao_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Endereco_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Endereco_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("atualizadoEm", "bairro", "cep", "cidade", "complemento", "criadoEm", "estado", "id", "logradouro", "numero", "pais", "usuarioId") SELECT "atualizadoEm", "bairro", "cep", "cidade", "complemento", "criadoEm", "estado", "id", "logradouro", "numero", "pais", "usuarioId" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE UNIQUE INDEX "Endereco_usuarioId_key" ON "Endereco"("usuarioId");
CREATE UNIQUE INDEX "Endereco_manutencaoId_key" ON "Endereco"("manutencaoId");
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
    CONSTRAINT "Foto_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Foto_manutencaoLogoId_fkey" FOREIGN KEY ("manutencaoLogoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Foto" ("atualizadoEm", "criadoEm", "id", "motoristaId", "noticiaId", "url", "usuarioId", "veiculoId") SELECT "atualizadoEm", "criadoEm", "id", "motoristaId", "noticiaId", "url", "usuarioId", "veiculoId" FROM "Foto";
DROP TABLE "Foto";
ALTER TABLE "new_Foto" RENAME TO "Foto";
CREATE UNIQUE INDEX "Foto_noticiaId_key" ON "Foto"("noticiaId");
CREATE UNIQUE INDEX "Foto_profissionalId_key" ON "Foto"("profissionalId");
CREATE UNIQUE INDEX "Foto_usuarioId_key" ON "Foto"("usuarioId");
CREATE UNIQUE INDEX "Foto_motoristaId_key" ON "Foto"("motoristaId");
CREATE UNIQUE INDEX "Foto_manutencaoLogoId_key" ON "Foto"("manutencaoLogoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Manutencao_email_key" ON "Manutencao"("email");

-- CreateIndex
CREATE INDEX "EspecialidadeManutencao_manutencaoId_idx" ON "EspecialidadeManutencao"("manutencaoId");

-- CreateIndex
CREATE UNIQUE INDEX "EspecialidadeManutencao_nome_manutencaoId_key" ON "EspecialidadeManutencao"("nome", "manutencaoId");
