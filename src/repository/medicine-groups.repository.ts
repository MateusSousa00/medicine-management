import { Injectable } from '@nestjs/common';
import { MedicineGroupDto } from '../dto/medicine-group.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicineGroupsRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: MedicineGroupDto, userId: number) {
    return await this.prisma.medicineGroup.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.medicineGroup.findMany();
  }

  async findById(id: string) {
    return await this.prisma.medicineGroup.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async findByName(name: string) {
    return await this.prisma.medicineGroup.findFirst({
      where: { name },
    });
  }

  async update(id: string, dto: MedicineGroupDto) {
    return await this.prisma.medicineGroup.update({
      where: {
        id: Number(id),
      },
      data: {
        name: dto.name,
        userId: dto.userId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.medicineGroup.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
