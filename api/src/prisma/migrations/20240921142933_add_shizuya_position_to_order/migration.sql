/*
  Warnings:

  - You are about to drop the column `latitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerAreaName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLatitude` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLongitude` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shizuyaAreaName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shizuyaLatitude` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shizuyaLongitude` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "customerAreaName" TEXT NOT NULL,
ADD COLUMN     "customerLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "customerLongitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shizuyaAreaName" TEXT NOT NULL,
ADD COLUMN     "shizuyaLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shizuyaLongitude" DOUBLE PRECISION NOT NULL;
