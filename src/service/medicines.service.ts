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

  //Nesta funcao e feita as validacoes para criacao de um medicamento
  async create(dto: MedicineDto): Promise<{ id: string }> {
    //primeira validacao: o nome nao pode estar nulo.
    if (!dto.name) {
      throw new BadRequestException('name must be on body.');
    }

    //segunda validacao: a quantidade nao pode estar nula.
    if (!dto.quantity) {
      throw new BadRequestException('quantity must be on body.');
    }

    //terceira validacao: o nome do grupo de medicamentos nao pode estar nulo.
    if (!dto.medicineGroupName) {
      throw new BadRequestException('medicineGroupName must be on body.');
    }

    //quarta validacao: nao podem haver dois medicamentos com exatamente o mesmo nome.
    const alreadyExists = await this.repository.findByName(dto.name);

    if (alreadyExists) {
      throw new ConflictException(`This name: ${dto.name} is already in use.`);
    }

    //busca do grupo de medicamentos pelo nome
    const medicineGroup = await this.medicineGroupService.findByName(
      dto.medicineGroupName,
    );

    //criacao do medicamento.
    const medicine = await this.repository.create(dto, medicineGroup.id);
    return { id: medicine.id.toString() };
  }

  //funcao para busca de todos os medicamentos
  async findAll(): Promise<MedicineDto[]> {
    return await this.repository.findAll();
  }

  //funcao para busca de apenas um medicamento
  async findOne(id: string): Promise<MedicineDto> {
    const medicine = await this.repository.findById(id);
    //caso o medicamento nao seja encontrado, lancamos um erro 404 para o usuario informando que o medicamento nao existe.
    if (!medicine) {
      throw new NotFoundException(`No medicine found with this id: ${id}.`);
    }
    return medicine;
  }

  //funcao para atualizar um medicamento
  async update(id: string, dto: MedicineDto): Promise<{ data: string }> {
    const medicine = this.repository.findById(id);
    //caso o medicamento nao seja encontrado, lancamos um erro 404 para o usuario informando que o medicamento nao existe.
    if (!medicine) {
      throw new BadRequestException(
        `There is no medicine with this id recorded on our database`,
      );
    }
    //medicamento atualizado
    await this.repository.update(id, dto);
    return { data: `Medicine with id: ${id} successfully updated.` };
  }

  //funcao para remover um medicamento
  async remove(id: string): Promise<{ data: string }> {
    const medicine = this.repository.findById(id);
    //caso o medicamento nao seja encontrado, lancamos um erro 404 para o usuario informando que o medicamento nao existe.
    if (!medicine) {
      throw new BadRequestException(
        `There is no medicine with this id recorded on our database`,
      );
    }
    //medicamento removido
    await this.repository.remove(id);
    return { data: `Medicine with id: ${id} successfully deleted.` };
  }
}
