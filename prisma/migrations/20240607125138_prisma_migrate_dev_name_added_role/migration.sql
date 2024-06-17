/*
  Warnings:

  - Added the required column `phoneNumber` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BATTER', 'BOWLER', 'ALLROUNDER');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;
