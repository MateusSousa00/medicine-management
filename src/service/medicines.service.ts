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

  //Nesta Função é feita as validacoes para criação de um medicamento
  async create(dto: MedicineDto): Promise<{ id: string }> {
    //Primeira validação: o nome não pode estar nulo.
    if (!dto.name) {
      throw new BadRequestException('name must be on body.');
    }

    //Segunda validação: a quantidade não pode estar nula.
    if (!dto.quantity) {
      throw new BadRequestException('quantity must be on body.');
    }

    //Terceira validação: o nome do grupo de medicamentos não pode estar nulo.
    if (!dto.medicineGroupName) {
      throw new BadRequestException('medicineGroupName must be on body.');
    }

    //Quarta validação: não podem haver dois medicamentos com exatamente o mesmo nome.
    const alreadyExists = await this.repository.findByName(dto.name);

    if (alreadyExists) {
      throw new ConflictException(`This name: ${dto.name} is already in use.`);
    }

    //Busca do grupo de medicamentos pelo nome
    const medicineGroup = await this.medicineGroupService.findByName(
      dto.medicineGroupName,
    );

    //Criação do medicamento.
    const medicine = await this.repository.create(dto, medicineGroup.id);
    return { id: medicine.id.toString() };
  }

  //Função para busca de todos os medicamentos
  async findAll(): Promise<MedicineDto[]> {
    return await this.repository.findAll();
  }

  //Função para busca de apenas um medicamento
  async findOne(id: string): Promise<MedicineDto> {
    const medicine = await this.repository.findById(id);
    //Caso o medicamento não seja encontrado, lançamos um erro 404 para o usuario informando que o medicamento não existe.
    if (!medicine) {
      throw new NotFoundException(`No medicine found with this id: ${id}.`);
    }
    return medicine;
  }

  //Função para atualizar um medicamento
  async update(id: string, dto: MedicineDto): Promise<{ data: string }> {
    const medicine = this.repository.findById(id);
    //Caso o medicamento não seja encontrado, lançamos um erro 404 para o usuario informando que o medicamento não existe.
    if (!medicine) {
      throw new BadRequestException(
        `There is no medicine with this id recorded on our database`,
      );
    }
    //Medicamento atualizado
    await this.repository.update(id, dto);
    return { data: `Medicine with id: ${id} successfully updated.` };
  }

  //Função para remover um medicamento
  async remove(id: string): Promise<{ data: string }> {
    const medicine = this.repository.findById(id);
    //Caso o medicamento não seja encontrado, lançamos um erro 404 para o usuario informando que o medicamento não existe.
    if (!medicine) {
      throw new BadRequestException(
        `There is no medicine with this id recorded on our database`,
      );
    }
    //Medicamento removido
    await this.repository.remove(id);
    return { data: `Medicine with id: ${id} successfully deleted.` };
  }
}
