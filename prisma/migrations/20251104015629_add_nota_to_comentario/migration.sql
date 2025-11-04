/*
  Warnings:

  - Added the required column `nota` to the `Comentario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comentario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "visivel" BOOLEAN NOT NULL DEFAULT true,
    "autorId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "deletadoEm" DATETIME,
    "profissionalId" TEXT,
    "motoristaId" TEXT,
    "manutencaoId" TEXT,
    "acessibilidadeUrbanaId" TEXT,
    CONSTRAINT "Comentario_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comentario_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_acessibilidadeUrbanaId_fkey" FOREIGN KEY ("acessibilidadeUrbanaId") REFERENCES "AcessibilidadeUrbana" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("acessibilidadeUrbanaId", "atualizadoEm", "autorId", "conteudo", "criadoEm", "deletadoEm", "id", "manutencaoId", "motoristaId", "profissionalId", "visivel") SELECT "acessibilidadeUrbanaId", "atualizadoEm", "autorId", "conteudo", "criadoEm", "deletadoEm", "id", "manutencaoId", "motoristaId", "profissionalId", "visivel" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
CREATE INDEX "Comentario_autorId_idx" ON "Comentario"("autorId");
CREATE INDEX "Comentario_profissionalId_idx" ON "Comentario"("profissionalId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
