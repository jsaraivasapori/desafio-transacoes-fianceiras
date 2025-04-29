/*
  Warnings:

  - Changed the type of `tipo_transacao` on the `Transacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "tipo_transacao" AS ENUM ('credito', 'debito');

-- AlterTable
ALTER TABLE "Transacao" DROP COLUMN "tipo_transacao",
ADD COLUMN     "tipo_transacao" "tipo_transacao" NOT NULL;

-- DropEnum
DROP TYPE "tipo_trnsacao";
