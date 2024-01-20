/*
  Warnings:

  - Added the required column `quantity` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "quantity" INTEGER NOT NULL;
