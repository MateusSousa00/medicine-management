import { Module } from '@nestjs/common';
import { MedicineGroupsController } from './controller/medicine-groups.controller';
import { MedicineGroupsService } from './service/medicine-groups.service';
import { MedicinesController } from './controller/medicines.controller';
import { MedicinesService } from './service/medicines.service';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { MedicineGroupsRepository } from './repository/medicine-groups.repository';
import { MedicinesRepository } from './repository/medicines.repository';
import { UsersRepository } from './repository/users.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MedicineGroupsController, MedicinesController, UsersController],
  providers: [
    MedicineGroupsService,
    MedicinesService,
    UsersService,
    MedicineGroupsRepository,
    MedicinesRepository,
    UsersRepository,
    PrismaService,
  ],
})
export class AppModule {}
