-- CreateTable
CREATE TABLE "TrainingEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weightKg" REAL NOT NULL
);
