import { Injectable } from '@nestjs/common';
import { MedicineGroupDto } from '../dto/medicine-group.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicineGroupsRepository {
  constructor(private prisma: PrismaService) {}

  //Funcao para realizar a criacao de um grupo de medicamentos no banco de dados pela ORM Prisma
  async create(dto: MedicineGroupDto, userId: number) {
    return await this.prisma.medicineGroup.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  //Funcao para realizar a busca de todos os grupos de medicamentos no banco de dados pela ORM Prisma
  async findAll() {
    return await this.prisma.medicineGroup.findMany();
  }

  //Funcao para realizar a busca de um grupo de medicamentos pelo id no banco de dados pela ORM Prisma
  async findById(id: string) {
    return await this.prisma.medicineGroup.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  //Funcao para realizar a busca de um grupo de medicamentos pelo nome no banco de dados pela ORM Prisma
  async findByName(name: string) {
    return await this.prisma.medicineGroup.findFirst({
      where: { name },
    });
  }

  //Funcao para atualizar um grupo de medicamentos pelo id no banco de dados pela ORM Prisma
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

  //Funcao para remover um grupo de medicamentos pelo id no banco de dados pela ORM Prisma
  async remove(id: string) {
    return await this.prisma.medicineGroup.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
