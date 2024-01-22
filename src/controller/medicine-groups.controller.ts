import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MedicineGroupsService } from '../service/medicine-groups.service';
import { MedicineGroupDto } from '../dto/medicine-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

//Nosso middleware de autenticação para validação do token JWT na Header.
@UseGuards(AuthGuard)
@Controller('medicine-groups')
export class MedicineGroupsController {
  constructor(
    private readonly service: MedicineGroupsService,
    private readonly jwtService: JwtService,
  ) {}

  //Com o token temos a facilidade de validar as informações do usuário realizando sua descriptografia
  //Nesta função em específico estamos criando os grupos de medicamentos
  @Post()
  create(@Body() dto: MedicineGroupDto, @Req() req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const jwt = this.jwtService.decode(token);
    return this.service.create(dto, jwt.username);
  }

  //Função para retornar todos os medicamentos
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //Função para retornar apenas um grupo de medicamento por seu id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //Função para atualizar o dado de um grupo de medicamento por seu id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: MedicineGroupDto) {
    return this.service.update(id, dto);
  }

  //Função para deletar um grupo de medicamento por seu id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
