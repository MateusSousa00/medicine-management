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

  //Nesta função e feita as validações para criação de um usuário
  async create(dto: UserDto): Promise<{ id: string }> {
    //Primeira validação: o username não pode estar nulo
    if (!dto.username) {
      throw new BadRequestException('username must be on body.');
    }

    //Segunda validação: sua senha (password) não pode estar nula
    if (!dto.password) {
      throw new BadRequestException('password must be on body.');
    }
    /**
     * Pequena observacao sobre a senha.
     * Em situacoes de vida real como no ambiente de trabalho,
     * jamais seria aceito a criação senha sem uma criptográfia por trás para salvar no banco de dados.
     * Por se tratar de um pequeno estudo e teste optei por deixar a senha sem a criptográfia.
     * Pode ser que venha a criá-la em um MVP 2 com um front end em nextjs integrado.
     */

    //Terceira validação: não pode haver dois usuários com o mesmo username
    const alreadyExists = await this.repository.findByUsername(dto.username);

    if (alreadyExists) {
      throw new ConflictException(
        `This username: ${dto.username} is already in use.`,
      );
    }

    //Criação do usuário.
    const user = await this.repository.create(dto);
    return { id: user.id.toString() };
  }

  //Função para busca de todos os usuários
  async findAll(): Promise<UserDto[]> {
    return await this.repository.findAll();
  }

  //Função para busca de apenas um usuário
  async findOne(id: string): Promise<UserDto> {
    const user = await this.repository.findById(id);
    //Caso o usuário não seja encontrado, lançamos um erro 404 para o usuário informando que o usuário não existe.
    if (!user) {
      throw new NotFoundException(`No user found with this id: ${id}.`);
    }
    return user;
  }

  //Função para encontrar um usuário pelo username
  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.repository.findByUsername(username);
    //Caso o usuário não seja encontrado, lançamos um erro 404 para o usuário informando que o usuário não existe.
    if (!user) {
      throw new NotFoundException(
        `No user found with this username: ${username}.`,
      );
    }
    return user;
  }

  //Função para atualizar um usuário
  async update(id: string, dto: UserDto): Promise<{ data: string }> {
    const user = await this.repository.findById(id);
    //Caso o usuário não seja encontrado, lançamos um erro 404 para o usuário informando que o usuário não existe.
    if (!user) {
      throw new BadRequestException(
        `There is no user with this id recorded on our database`,
      );
    }
    //Usuário atualizado
    await this.repository.update(id, dto);
    return { data: `User with id: ${id} successfully deleted.` };
  }

  //Função para remover um usuário
  async remove(id: string): Promise<{ data: string }> {
    const user = await this.repository.findById(id);
    //Caso o usuário não seja encontrado, lançamos um erro 404 para o usuário informando que o usuário não existe.
    if (!user) {
      throw new BadRequestException(
        `There is no user with this id recorded on our database`,
      );
    }
    //Usuário removido
    await this.repository.remove(id);
    return { data: `User with id: ${id} successfully deleted.` };
  }
}
