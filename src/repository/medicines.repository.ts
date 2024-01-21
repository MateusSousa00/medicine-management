import { Injectable } from '@nestjs/common';
import { MedicineDto } from '../dto/medicine.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicinesRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: MedicineDto) {
    return await this.prisma.medicine.create({
      data: {
        name: dto.name,
        quantity: dto.quantity,
        medicineGroupId: dto.medicineGroupId,
      },
    });
  }

  async findAll() {
    return await this.prisma.medicine.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.medicine.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: MedicineDto) {
    return await this.prisma.medicine.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        quantity: dto.quantity,
        medicineGroupId: dto.medicineGroupId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.medicine.delete({
      where: {
        id,
      },
    });
  }
}
