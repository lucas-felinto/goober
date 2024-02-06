-- CreateTable
CREATE TABLE "Rider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Rider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "fare" INTEGER NOT NULL,
    "distance" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "dropoffAddress" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "riderId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "canceledBy" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeclinesRides" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riderId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DeclinesRides_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeclinesRides" ADD CONSTRAINT "DeclinesRides_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeclinesRides" ADD CONSTRAINT "DeclinesRides_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
