import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UsersRepository } from 'src/repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(dto: UserDto): Promise<{ id: number }> {
    const user = await this.repository.create(dto);
    return { id: user.id };
  }

  async findAll(): Promise<UserDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<UserDto> {
    return await this.repository.findOne(id);
  }

  async update(id: number, dto: UserDto): Promise<{ data: string }> {
    await this.repository.update(id, dto);
    return { data: `User with id: ${id} successfully deleted.` };
  }

  async remove(id: number): Promise<{ data: string }> {
    await this.repository.remove(id);
    return { data: `User with id: ${id} successfully deleted.` };
  }
}
