/*
  Warnings:

  - Made the column `status` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "status" SET NOT NULL;
