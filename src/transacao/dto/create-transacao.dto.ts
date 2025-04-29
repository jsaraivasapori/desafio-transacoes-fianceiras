import { tipo_transacao } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTransacaoDto {
  @IsDateString()
  @IsOptional()
  data_transacao: string;

  // ------------------------------
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Min(0.01)
  valor: number;
  // -----------------------------------------
  @IsNotEmpty()
  tipo_transacao: tipo_transacao;
  // -------------------------------------------------------
  @IsNotEmpty()
  @IsNumber()
  @IsNumber()
  @Min(0.0001)
  taxa: number;
  // --------------------------------------------------------
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  parcelas: number;
  //--------------------------------------------------------------
  @IsUUID()
  @IsNotEmpty()
  cliente: string;
}
