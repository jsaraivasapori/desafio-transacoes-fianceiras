import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [PrismaModule, UserModule, TransacaoModule],
})
export class AppModule {}
