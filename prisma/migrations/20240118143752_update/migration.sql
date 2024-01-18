/*
  Warnings:

  - The `canceledBy` column on the `Ride` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `Driver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "canceledBy",
ADD COLUMN     "canceledBy" TEXT;

-- DropEnum
DROP TYPE "CanceledBy";

-- DropEnum
DROP TYPE "DriverStatus";

-- DropEnum
DROP TYPE "RideStatus";
