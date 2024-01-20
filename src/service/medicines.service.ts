import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from '../dto/create-medicine.dto';

@Injectable()
export class MedicinesService {
  create(createMedicineDto: CreateMedicineDto) {
    return 'This action adds a new medicine';
  }

  findAll() {
    return `This action returns all medicines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicine`;
  }

  update(id: number, updateMedicineDto: CreateMedicineDto) {
    return `This action updates a #${id} medicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
