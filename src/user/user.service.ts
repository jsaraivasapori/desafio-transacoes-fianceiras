import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException({
        message: 'Usuário não encontrado',
        error: 'Not found',
        statusCode: 404,
      });
    }
    return user;
  }

  async update(
    @Param('id', ParseUUIDPipe) id: string,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException({
          message: 'Usuário não encontrado',
          error: 'Not found',
          statusCode: 404,
        });
      }
      throw error;
    }
  }

  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      // Verifica se o erro é de registro não encontrado
      if (error.code === 'P2025') {
        throw new NotFoundException({
          message: 'Usuário não encontrado para exclusão',
          error: 'Not Found',
          statusCode: 404,
        });
      }
      // Repassa outros erros (ex: problemas de conexão)
      throw error;
    }
  }
}
