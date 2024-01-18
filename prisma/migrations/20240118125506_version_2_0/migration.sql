/*
  Warnings:

  - Added the required column `status` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Rider` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('available', 'on_ride');

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "status" "DriverStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Rider" ADD COLUMN     "image" TEXT NOT NULL;
