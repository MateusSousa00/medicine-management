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

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

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

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
