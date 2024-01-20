-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MedicineGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "medicineGroupId" INTEGER NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "MedicineGroup_userId_idx" ON "MedicineGroup"("userId");

-- CreateIndex
CREATE INDEX "Medicine_medicineGroupId_idx" ON "Medicine"("medicineGroupId");

-- AddForeignKey
ALTER TABLE "MedicineGroup" ADD CONSTRAINT "MedicineGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_medicineGroupId_fkey" FOREIGN KEY ("medicineGroupId") REFERENCES "MedicineGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
