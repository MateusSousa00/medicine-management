import { Injectable } from '@nestjs/common';
import { MedicineDto } from '../dto/medicine.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicinesRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: MedicineDto, medicineGroupId: number) {
    return await this.prisma.medicine.create({
      data: {
        name: dto.name,
        quantity: dto.quantity,
        medicineGroupId,
      },
    });
  }

  async findAll() {
    return await this.prisma.medicine.findMany({
      select: {
        id: true,
        medicineGroupId: true,
        name: true,
        quantity: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.medicine.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        medicineGroupId: true,
        name: true,
        quantity: true,
      },
    });
  }

  async findByName(name: string) {
    return await this.prisma.medicine.findFirst({
      where: {
        name,
      },
    });
  }

  async update(id: string, dto: MedicineDto) {
    return await this.prisma.medicine.update({
      where: {
        id: Number(id),
      },
      data: {
        name: dto.name,
        quantity: dto.quantity,
        medicineGroupId: dto.medicineGroupId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.medicine.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
