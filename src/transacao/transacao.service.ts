import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransacaoDto: CreateTransacaoDto) {
    return this.prisma.transacao.create({
      data: {
        taxa: createTransacaoDto.taxa,
        tipo_transacao: createTransacaoDto.tipo_transacao,
        valor: createTransacaoDto.valor,
        parcelas: createTransacaoDto.parcelas,
        cliente: { connect: { id: createTransacaoDto.cliente } },
      },
    });
  }

  async findAll() {
    return this.prisma.transacao.findMany();
  }

  async findOne(id: string) {
    const transacao = await this.prisma.transacao.findUnique({
      where: { id },
    });
    if (!transacao) {
      throw new NotFoundException({
        message: 'Usuário não encontrado',
        error: 'Not found',
        statusCode: 404,
      });
    }
    return transacao;
  }
}
