-- CreateEnum
CREATE TYPE "Type_user" AS ENUM ('COMPRADOR', 'ANUNCIANTE');

-- CreateEnum
CREATE TYPE "Type_fuel" AS ENUM ('GASOLINA', 'ETANOL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "birth" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "type" "Type_user" NOT NULL DEFAULT 'COMPRADOR',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adresses" (
    "id" TEXT NOT NULL,
    "cep" VARCHAR(150) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "number" INTEGER,
    "complement" VARCHAR(50) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Adresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "mark" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "fuel" "Type_fuel" NOT NULL DEFAULT 'GASOLINA',
    "km" DOUBLE PRECISION NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fipe" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "announcement_id" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "announcement_id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adresses_user_id_key" ON "Adresses"("user_id");

-- AddForeignKey
ALTER TABLE "Adresses" ADD CONSTRAINT "Adresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
