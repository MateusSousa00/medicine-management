import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto) {
    return await this.prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,
      },
    });
  }

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

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        medicineGroups: true,
        password: false,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async update(id: number, dto: UserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: dto.username,
        password: dto.password,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
