-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPublicacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT DEFAULT '',
    "foto" TEXT DEFAULT '',
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "Noticia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaNoticia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Noticia" ("categoriaId", "conteudo", "data", "dataPublicacao", "foto", "id", "titulo", "url") SELECT "categoriaId", "conteudo", "data", "dataPublicacao", "foto", "id", "titulo", "url" FROM "Noticia";
DROP TABLE "Noticia";
ALTER TABLE "new_Noticia" RENAME TO "Noticia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
