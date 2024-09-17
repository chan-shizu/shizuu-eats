-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('INITIAL', 'ACCEPTED', 'DENIED', 'PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "walkingTime" TEXT NOT NULL,
    "bicyclingTime" TEXT NOT NULL,
    "driveTime" TEXT NOT NULL,
    "orderName" TEXT NOT NULL,
    "orderRemark" TEXT NOT NULL,
    "orderBudget" INTEGER NOT NULL,
    "customInfoName" TEXT NOT NULL,
    "customInfoRemark" TEXT NOT NULL,
    "customInfoConfirm" BOOLEAN NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'INITIAL',
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
