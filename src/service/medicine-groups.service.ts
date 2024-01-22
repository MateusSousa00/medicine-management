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

  //Nesta função e feita as validações para criação de um grupo de medicamentos
  async create(
    dto: MedicineGroupDto,
    username: string,
  ): Promise<{ id: string }> {
    //Primeira validação: o nome não pode estar nulo.
    if (!dto.name) {
      throw new BadRequestException('name must be on body.');
    }

    //Segunda validação: não pode existir mais de um grupo de medicamentos com o mesmo nome.
    const alreadyExists = await this.repository.findByName(dto.name);

    if (alreadyExists) {
      throw new ConflictException(`This name: ${dto.name} is already in use.`);
    }

    //Busca pelo usuário pelo nome para relacionarmos quem criou o grupo de medicamentos.
    const user = await this.usersService.findByUsername(username);

    //Criação do grupo de medicamentos.
    const medicineGroup = await this.repository.create(dto, user.id);
    return { id: medicineGroup.id.toString() };
  }

  //Função para busca de todos os grupos de medicamentos
  async findAll(): Promise<MedicineGroupDto[]> {
    return await this.repository.findAll();
  }

  //Função para busca de apenas um grupo de medicamentos
  async findOne(id: string): Promise<MedicineGroupDto> {
    const medicineGroup = await this.repository.findById(id);
    //Caso o grupo de medicamentos não seja encontrado, lançamos um erro 404 para o usuário informando que o grupo não existe.
    if (!medicineGroup) {
      throw new NotFoundException(
        `No medicine group found with this id: ${id}.`,
      );
    }
    return medicineGroup;
  }

  //Função para encontrar o grupo de medicamentos pelo nome
  async findByName(name: string) {
    const medicineGroup = await this.repository.findByName(name);
    //Caso o grupo de medicamentos não seja encontrado, lançamos um erro 404 para o usuário informando que o grupo não existe.
    if (!medicineGroup) {
      throw new NotFoundException(
        `No medicine group find for this name: ${name}`,
      );
    }
    return medicineGroup;
  }

  //Função para atualizar o grupo de medicamentos
  async update(id: string, dto: MedicineGroupDto): Promise<{ data: string }> {
    const medicineGroup = this.repository.findById(id);
    //Caso o grupo de medicamentos não seja encontrado, lançamos um erro 404 para o usuário informando que o grupo não existe.
    if (!medicineGroup) {
      throw new BadRequestException(
        `There is no medicine group with this id recorded on our database`,
      );
    }
    //Grupo de medicamentos atualizado
    await this.repository.update(id, dto);
    return { data: `Medicine Group with id: ${id} successfully updated.` };
  }

  //Função para remover o grupo de medicamentos
  async remove(id: string): Promise<{ data: string }> {
    const medicineGroup = this.repository.findById(id);
    //Caso o grupo de medicamentos não seja encontrado, lançamos um erro 404 para o usuário informando que o grupo não existe.
    if (!medicineGroup) {
      throw new BadRequestException(
        `There is no medicine group with this id recorded on our database`,
      );
    }
    //Grupo de medicamentos removido
    await this.repository.remove(id);
    return { data: `Medicine Group with id: ${id} successfully deleted.` };
  }
}
