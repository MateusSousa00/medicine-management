import { Injectable } from '@nestjs/common';
import { MedicineGroupDto } from '../dto/medicine-group.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicineGroupsRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: MedicineGroupDto) {
    return await this.prisma.medicineGroup.create({
      data: {
        name: dto.name,
        userId: dto.userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.medicineGroup.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.medicineGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: MedicineGroupDto) {
    return await this.prisma.medicineGroup.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        userId: dto.userId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.medicineGroup.delete({
      where: {
        id,
      },
    });
  }
}
