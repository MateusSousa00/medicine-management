import { Injectable } from '@nestjs/common';
import { MedicineGroupDto } from '../dto/medicine-group.dto';
import { MedicineGroupsRepository } from 'src/repository/medicine-groups.repository';

@Injectable()
export class MedicineGroupsService {
  constructor(private readonly repository: MedicineGroupsRepository) {}

  async create(dto: MedicineGroupDto): Promise<{ id: number }> {
    const medicineGroup = await this.repository.create(dto);
    return { id: medicineGroup.id };
  }

  async findAll(): Promise<MedicineGroupDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<MedicineGroupDto> {
    return await this.repository.findOne(id);
  }

  async update(id: number, dto: MedicineGroupDto): Promise<{ data: string }> {
    await this.repository.update(id, dto);
    return { data: `Medicine Group with id: ${id} successfully updated.` };
  }

  async remove(id: number): Promise<{ data: string }> {
    await this.repository.remove(id);
    return { data: `Medicine Group with id: ${id} successfully deleted.` };
  }
}
