import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MedicineDto } from '../dto/medicine.dto';
import { MedicinesRepository } from 'src/repository/medicines.repository';
import { MedicineGroupsService } from './medicine-groups.service';

@Injectable()
export class MedicinesService {
  constructor(
    private readonly repository: MedicinesRepository,
    private readonly medicineGroupService: MedicineGroupsService,
  ) {}

  async create(dto: MedicineDto): Promise<{ id: string }> {
    if (!dto.name) {
      throw new BadRequestException('name must be on body.');
    }

    if (!dto.quantity) {
      throw new BadRequestException('quantity must be on body.');
    }

    if (!dto.medicineGroupName) {
      throw new BadRequestException('medicineGroupName must be on body.');
    }

    const alreadyExists = await this.repository.findByName(dto.name);

    if (alreadyExists) {
      throw new ConflictException(`This name: ${dto.name} is already in use.`);
    }

    const medicineGroup = await this.medicineGroupService.findByName(
      dto.medicineGroupName,
    );
    const medicine = await this.repository.create(dto, medicineGroup.id);
    return { id: medicine.id.toString() };
  }

  async findAll(): Promise<MedicineDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<MedicineDto> {
    const medicine = await this.repository.findById(id);
    if (!medicine) {
      throw new NotFoundException(`No medicine found with this id: ${id}.`);
    }
    return medicine;
  }

  async update(id: string, dto: MedicineDto): Promise<{ data: string }> {
    const medicine = this.repository.findById(id);
    if (!medicine) {
      throw new BadRequestException(
        `There is no medicine with this id recorded on our database`,
      );
    }
    await this.repository.update(id, dto);
    return { data: `Medicine with id: ${id} successfully updated.` };
  }

  async remove(id: string): Promise<{ data: string }> {
    const medicine = this.repository.findById(id);
    if (!medicine) {
      throw new BadRequestException(
        `There is no medicine with this id recorded on our database`,
      );
    }
    await this.repository.remove(id);
    return { data: `Medicine with id: ${id} successfully deleted.` };
  }
}
