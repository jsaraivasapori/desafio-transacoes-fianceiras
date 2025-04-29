import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService],
  imports: [PrismaModule],
})
export class TransacaoModule {}
