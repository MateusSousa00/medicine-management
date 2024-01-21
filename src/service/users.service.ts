import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UsersRepository } from 'src/repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  //Nesta funcao e feita as validacoes para criacao de um usuario
  async create(dto: UserDto): Promise<{ id: string }> {
    //primeira validacao: o username nao pode estar nulo
    if (!dto.username) {
      throw new BadRequestException('username must be on body.');
    }

    //segunda validacao: sua senha (password) nao pode estar nula
    if (!dto.password) {
      throw new BadRequestException('password must be on body.');
    }

    //terceira validacao: nao pode haver dois usuarios com o o mesmo username
    const alreadyExists = await this.repository.findByUsername(dto.username);

    if (alreadyExists) {
      throw new ConflictException(
        `This username: ${dto.username} is already in use.`,
      );
    }

    //criacao do usuario.
    const user = await this.repository.create(dto);
    return { id: user.id.toString() };
  }

  //funcao para busca de todos os usuarios
  async findAll(): Promise<UserDto[]> {
    return await this.repository.findAll();
  }

  //funcao para busca de apenas um usuario
  async findOne(id: string): Promise<UserDto> {
    const user = await this.repository.findById(id);
    //caso o usuario nao seja encontrado, lancamos um erro 404 para o usuario informando que o usuario nao existe.
    if (!user) {
      throw new NotFoundException(`No user found with this id: ${id}.`);
    }
    return user;
  }

  //funcao para encontrar um usuario pelo username
  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.repository.findByUsername(username);
    //caso o usuario nao seja encontrado, lancamos um erro 404 para o usuario informando que o usuario nao existe.
    if (!user) {
      throw new NotFoundException(
        `No user found with this username: ${username}.`,
      );
    }
    return user;
  }

  //funcao para atualizar um usuario
  async update(id: string, dto: UserDto): Promise<{ data: string }> {
    const user = await this.repository.findById(id);
    //caso o usuario nao seja encontrado, lancamos um erro 404 para o usuario informando que o usuario nao existe.
    if (!user) {
      throw new BadRequestException(
        `There is no user with this id recorded on our database`,
      );
    }
    //usuario atualizado
    await this.repository.update(id, dto);
    return { data: `User with id: ${id} successfully deleted.` };
  }

  //funcao para remover um usuario
  async remove(id: string): Promise<{ data: string }> {
    const user = await this.repository.findById(id);
    //caso o usuario nao seja encontrado, lancamos um erro 404 para o usuario informando que o usuario nao existe.
    if (!user) {
      throw new BadRequestException(
        `There is no user with this id recorded on our database`,
      );
    }
    //usuario removido
    await this.repository.remove(id);
    return { data: `User with id: ${id} successfully deleted.` };
  }
}
