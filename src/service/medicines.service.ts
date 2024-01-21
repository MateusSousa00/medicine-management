import { Injectable } from '@nestjs/common';
import { MedicineDto } from '../dto/medicine.dto';
import { MedicinesRepository } from 'src/repository/medicines.repository';

@Injectable()
export class MedicinesService {
  constructor(private readonly repository: MedicinesRepository) {}

  async create(dto: MedicineDto): Promise<{ id: number }> {
    const medicine = await this.repository.create(dto);
    return { id: medicine.id };
  }

  async findAll(): Promise<MedicineDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<MedicineDto> {
    return await this.repository.findOne(id);
  }

  async update(id: number, dto: MedicineDto): Promise<{ data: string }> {
    await this.repository.update(id, dto);
    return { data: `Medicine with id: ${id} successfully updated.` };
  }

  async remove(id: number): Promise<{ data: string }> {
    await this.repository.remove(id);
    return { data: `Medicine with id: ${id} successfully deleted.` };
  }
}
