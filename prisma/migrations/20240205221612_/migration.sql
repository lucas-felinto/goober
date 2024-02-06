/*
  Warnings:

  - You are about to drop the column `riderId` on the `DeclinesRides` table. All the data in the column will be lost.
  - Added the required column `rideId` to the `DeclinesRides` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeclinesRides" DROP CONSTRAINT "DeclinesRides_riderId_fkey";

-- AlterTable
ALTER TABLE "DeclinesRides" DROP COLUMN "riderId",
ADD COLUMN     "rideId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DeclinesRides" ADD CONSTRAINT "DeclinesRides_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
