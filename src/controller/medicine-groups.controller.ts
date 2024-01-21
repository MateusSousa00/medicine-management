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

@UseGuards(AuthGuard)
@Controller('medicine-groups')
export class MedicineGroupsController {
  constructor(
    private readonly service: MedicineGroupsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() dto: MedicineGroupDto, @Req() req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const jwt = this.jwtService.decode(token);
    return this.service.create(dto, jwt.username);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: MedicineGroupDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
