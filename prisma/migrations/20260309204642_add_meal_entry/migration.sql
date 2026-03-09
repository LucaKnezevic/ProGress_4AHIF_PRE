-- CreateTable
CREATE TABLE "MealEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "meal" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kcal" REAL NOT NULL,
    "protein" REAL NOT NULL DEFAULT 0,
    "carbs" REAL NOT NULL DEFAULT 0,
    "fat" REAL NOT NULL DEFAULT 0
);
