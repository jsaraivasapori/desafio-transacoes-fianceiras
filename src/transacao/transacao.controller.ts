import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { tipo_transacao } from '@prisma/client';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  create(@Body() createTransacaoDto: CreateTransacaoDto) {
    return this.transacaoService.create(createTransacaoDto);
  }

  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacaoService.findOne(id);
  }
  @Get('listar')
  findTransationByUser(
    @Query('dataInicio,dataFim,tipo_transacao') dataInicio: string,
    dataFim: string,
    tipo_transacao: tipo_transacao,
  ) {
    return this.transacaoService.findByFilter(
      dataInicio,
      dataFim,
      tipo_transacao,
    );
  }

  @Get('resumoAnalitico')
  showResumoAnalitico() {
    return this.transacaoService.populateRelatorioAnalitico();
  }
}
