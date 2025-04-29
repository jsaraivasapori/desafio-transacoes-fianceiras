-- CreateEnum
CREATE TYPE "tipo_trnsacao" AS ENUM ('credito', 'debito');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DECIMAL(14,2) NOT NULL,
    "tipo_transacao" "tipo_trnsacao" NOT NULL,
    "taxa" DECIMAL(5,2) NOT NULL,
    "parcelas" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TransacaoToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_TransacaoToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TransacaoToUser_B_index" ON "_TransacaoToUser"("B");

-- AddForeignKey
ALTER TABLE "_TransacaoToUser" ADD CONSTRAINT "_TransacaoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Transacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransacaoToUser" ADD CONSTRAINT "_TransacaoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
