import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MedicineGroupDto } from '../dto/medicine-group.dto';
import { MedicineGroupsRepository } from 'src/repository/medicine-groups.repository';
import { UsersService } from './users.service';

@Injectable()
export class MedicineGroupsService {
  constructor(
    private readonly repository: MedicineGroupsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    dto: MedicineGroupDto,
    username: string,
  ): Promise<{ id: string }> {
    if (!dto.name) {
      throw new BadRequestException('name must be on body.');
    }

    const alreadyExists = await this.repository.findByName(dto.name);

    if (alreadyExists) {
      throw new ConflictException(`This name: ${dto.name} is already in use.`);
    }

    const user = await this.usersService.findByUsername(username);

    const medicineGroup = await this.repository.create(dto, user.id);
    return { id: medicineGroup.id.toString() };
  }

  async findAll(): Promise<MedicineGroupDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<MedicineGroupDto> {
    const medicineGroup = await this.repository.findById(id);
    if (!medicineGroup) {
      throw new NotFoundException(
        `No medicine group found with this id: ${id}.`,
      );
    }
    return medicineGroup;
  }

  async findByName(name: string) {
    const medicineGroup = await this.repository.findByName(name);
    if (!medicineGroup) {
      throw new NotFoundException(
        `No medicine group find for this name: ${name}`,
      );
    }
    return medicineGroup;
  }

  async update(id: string, dto: MedicineGroupDto): Promise<{ data: string }> {
    const medicineGroup = this.repository.findById(id);
    if (!medicineGroup) {
      throw new BadRequestException(
        `There is no medicine group with this id recorded on our database`,
      );
    }
    await this.repository.update(id, dto);
    return { data: `Medicine Group with id: ${id} successfully updated.` };
  }

  async remove(id: string): Promise<{ data: string }> {
    const medicineGroup = this.repository.findById(id);
    if (!medicineGroup) {
      throw new BadRequestException(
        `There is no medicine group with this id recorded on our database`,
      );
    }
    await this.repository.remove(id);
    return { data: `Medicine Group with id: ${id} successfully deleted.` };
  }
}
