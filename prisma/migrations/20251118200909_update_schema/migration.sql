/*
  Warnings:

  - You are about to drop the `EspecialidadeManutencao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EspecialidadeManutencao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ManutencaoEspecialidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "manutencaoId" TEXT NOT NULL,
    CONSTRAINT "ManutencaoEspecialidade_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ManutencaoEspecialidade_manutencaoId_idx" ON "ManutencaoEspecialidade"("manutencaoId");

-- CreateIndex
CREATE UNIQUE INDEX "ManutencaoEspecialidade_tipo_manutencaoId_key" ON "ManutencaoEspecialidade"("tipo", "manutencaoId");
