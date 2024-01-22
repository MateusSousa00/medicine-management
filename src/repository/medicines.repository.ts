import { Injectable } from '@nestjs/common';
import { MedicineDto } from '../dto/medicine.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicinesRepository {
  constructor(private prisma: PrismaService) {}

  //Função para realizar a criação de um medicamento no banco de dados pela ORM Prisma
  async create(dto: MedicineDto, medicineGroupId: number) {
    return await this.prisma.medicine.create({
      data: {
        name: dto.name,
        quantity: dto.quantity,
        medicineGroupId,
      },
    });
  }

  //Função para buscar todos os medicamentos no banco de dados pela ORM Prisma
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

  //Função para buscar um medicamento pelo id no banco de dados pela ORM Prisma
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

  //Função para buscar um medicamento pelo nome no banco de dados pela ORM Prisma
  async findByName(name: string) {
    return await this.prisma.medicine.findFirst({
      where: {
        name,
      },
    });
  }

  //Função para atualizar um medicamento pelo id no banco de dados pela ORM Prisma
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

  //Função para remover um medicamento pelo id no banco de dados pela ORM Prisma
  async remove(id: string) {
    return await this.prisma.medicine.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
