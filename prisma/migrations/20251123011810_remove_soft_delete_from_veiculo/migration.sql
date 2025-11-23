/*
  Warnings:

  - You are about to drop the column `deletadoEm` on the `Veiculo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Veiculo" (
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
INSERT INTO "new_Veiculo" ("atualizadoEm", "cor", "criadoEm", "id", "marca", "modelo", "motoristaId", "placa") SELECT "atualizadoEm", "cor", "criadoEm", "id", "marca", "modelo", "motoristaId", "placa" FROM "Veiculo";
DROP TABLE "Veiculo";
ALTER TABLE "new_Veiculo" RENAME TO "Veiculo";
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");
CREATE UNIQUE INDEX "Veiculo_motoristaId_key" ON "Veiculo"("motoristaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
