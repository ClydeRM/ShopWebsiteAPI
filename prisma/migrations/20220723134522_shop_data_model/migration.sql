/*
  Warnings:

  - You are about to alter the column `firstname` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `lastname` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDIT', 'PREPAID', 'TRANSFERS', 'CASH', 'MOBILE');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('DELIVERY', 'BILL');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MANAGER';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "phone" VARCHAR(10),
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "role" SET DEFAULT E'USER';

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "paymentType" "PaymentType" NOT NULL DEFAULT E'CREDIT',
    "bankCode" VARCHAR(3),
    "account" VARCHAR(16),
    "expiry" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "country" VARCHAR(128) NOT NULL,
    "state" VARCHAR(128) NOT NULL,
    "city" VARCHAR(128) NOT NULL,
    "district" VARCHAR(128) NOT NULL,
    "postalCode" VARCHAR(128) NOT NULL,
    "address" VARCHAR(128) NOT NULL,
    "type" "AddressType" NOT NULL DEFAULT E'DELIVERY',

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "total" REAL NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" UUID NOT NULL,
    "mercId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subTotal" REAL NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "mercId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subTotal" REAL NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchandise" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "catId" UUID NOT NULL,
    "invId" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "desc" VARCHAR(500) NOT NULL,
    "image" TEXT,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "merchandise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" VARCHAR(200) NOT NULL,
    "desc" VARCHAR(500),
    "enable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payments_id_idx" ON "payments"("id");

-- CreateIndex
CREATE INDEX "orders_id_userId_idx" ON "orders"("id", "userId");

-- CreateIndex
CREATE INDEX "order_items_id_orderId_idx" ON "order_items"("id", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_mercId_key" ON "cart_items"("mercId");

-- CreateIndex
CREATE INDEX "cart_items_id_userId_mercId_idx" ON "cart_items"("id", "userId", "mercId");

-- CreateIndex
CREATE UNIQUE INDEX "merchandise_invId_key" ON "merchandise"("invId");

-- CreateIndex
CREATE INDEX "merchandise_id_catId_invId_idx" ON "merchandise"("id", "catId", "invId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "categories_id_idx" ON "categories"("id");

-- CreateIndex
CREATE INDEX "inventories_id_idx" ON "inventories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_mercId_fkey" FOREIGN KEY ("mercId") REFERENCES "merchandise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_mercId_fkey" FOREIGN KEY ("mercId") REFERENCES "merchandise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise" ADD CONSTRAINT "merchandise_catId_fkey" FOREIGN KEY ("catId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise" ADD CONSTRAINT "merchandise_invId_fkey" FOREIGN KEY ("invId") REFERENCES "inventories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
