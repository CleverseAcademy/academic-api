/*
 Warnings:

 - A unique constraint covering the columns `[username]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.
 - Added the required column `username` to the `Teacher` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Teacher"
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "password" CHAR(60) NOT NULL DEFAULT '$2a$12$mC1TXsa/.keznSkCQ37ymOynHnZF7oXYaAKxAQHlvOCNAD1cs38v6',
  ADD COLUMN "username" TEXT NOT NULL DEFAULT substring(CONCAT('user-', gen_random_uuid()) FROM 1 FOR 13);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

