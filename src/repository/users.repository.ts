import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  //Função para realizar a criação de um usuario no banco de dados pela ORM Prisma
  async create(dto: UserDto) {
    return await this.prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,
      },
    });
  }

  //Função para buscar todos os usuarios no banco de dados pela ORM Prisma
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        medicineGroups: true,
        password: false,
      },
    });
  }

  //Função para buscar um usuario pelo id no banco de dados pela ORM Prisma
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        username: true,
        medicineGroups: true,
        password: false,
      },
    });
  }

  //Função para buscar um usuario pelo nome no banco de dados pela ORM Prisma
  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  //Função para atualizar um usuario pelo id no banco de dados pela ORM Prisma
  async update(id: string, dto: UserDto) {
    return await this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: dto.username,
        password: dto.password,
      },
    });
  }

  //Função para remover um usuario pelo id no banco de dados pela ORM Prisma
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
