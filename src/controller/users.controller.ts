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

//Nosso middleware de autenticacao para validacao do token JWT na Header.
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  //Funcao para criar um usuario
  @Post()
  create(@Body() dto: UserDto) {
    return this.service.create(dto);
  }

  //Funcao para retornar todos os usuarios
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //Funcao para retornar apenas um usuario por seu id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //Funcao para atualizar o dado de um usuario por seu id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UserDto) {
    return this.service.update(id, dto);
  }

  //Funcao para deletar um grupo de medicamento por seu id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
