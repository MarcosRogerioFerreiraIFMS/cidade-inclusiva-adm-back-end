/*
  Warnings:

  - A unique constraint covering the columns `[placa,motoristaId]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `foto` on table `Profissional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Profissional` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPublicacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "foto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "Profissional_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaProfissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profissional" ("categoriaId", "email", "foto", "id", "nome", "telefone") SELECT "categoriaId", "email", "foto", "id", "nome", "telefone" FROM "Profissional";
DROP TABLE "Profissional";
ALTER TABLE "new_Profissional" RENAME TO "Profissional";
CREATE UNIQUE INDEX "Profissional_email_key" ON "Profissional"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_motoristaId_key" ON "Veiculo"("placa", "motoristaId");
