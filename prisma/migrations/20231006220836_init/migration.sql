-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "url" SET DATA TYPE VARCHAR(255);