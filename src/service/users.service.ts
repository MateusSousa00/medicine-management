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

  async create(dto: UserDto): Promise<{ id: string }> {
    if (!dto.username) {
      throw new BadRequestException('username must be on body.');
    }

    if (!dto.password) {
      throw new BadRequestException('password must be on body.');
    }

    const alreadyExists = await this.repository.findByUsername(dto.username);

    if (alreadyExists) {
      throw new ConflictException(
        `This username: ${dto.username} is already in use.`,
      );
    }

    const user = await this.repository.create(dto);
    return { id: user.id.toString() };
  }

  async findAll(): Promise<UserDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(`No user found with this id: ${id}.`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.repository.findByUsername(username);
    if (!user) {
      throw new NotFoundException(
        `No user found with this username: ${username}.`,
      );
    }
    return user;
  }

  async update(id: string, dto: UserDto): Promise<{ data: string }> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new BadRequestException(
        `There is no user with this id recorded on our database`,
      );
    }
    await this.repository.update(id, dto);
    return { data: `User with id: ${id} successfully deleted.` };
  }

  async remove(id: string): Promise<{ data: string }> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new BadRequestException(
        `There is no user with this id recorded on our database`,
      );
    }
    await this.repository.remove(id);
    return { data: `User with id: ${id} successfully deleted.` };
  }
}
