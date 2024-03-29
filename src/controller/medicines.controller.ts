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
import { MedicinesService } from '../service/medicines.service';
import { MedicineDto } from '../dto/medicine.dto';
import { AuthGuard } from 'src/auth/auth.guard';

//Nosso middleware de autenticação para validação do token JWT na Header.
@UseGuards(AuthGuard)
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly service: MedicinesService) {}

  //Função para criar um medicamento
  @Post()
  create(@Body() dto: MedicineDto) {
    return this.service.create(dto);
  }

  //Função para retornar todos os medicamentos
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //Função para retornar apenas um medicamento por seu id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //Função para atualizar o dado de um medicamento por seu id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: MedicineDto) {
    return this.service.update(id, dto);
  }

  //Função para deletar um grupo de medicamento por seu id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
