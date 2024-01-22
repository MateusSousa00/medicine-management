import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

//Nosso middleware de autenticação para validação do token JWT na Header.
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  //Função para criar um usuario
  @Post()
  create(@Body() dto: UserDto) {
    return this.service.create(dto);
  }

  //Função para retornar todos os usuários
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //Função para retornar apenas um usuário por seu id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //Função para atualizar o dado de um usuário por seu id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UserDto) {
    return this.service.update(id, dto);
  }

  //Função para deletar um grupo de medicamento por seu id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
