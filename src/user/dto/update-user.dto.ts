import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(3)
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @MinLength(8)
  @IsString()
  @IsOptional()
  senha: string;
}
