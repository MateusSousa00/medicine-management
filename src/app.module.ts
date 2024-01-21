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
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [
    MedicineGroupsController,
    MedicinesController,
    UsersController,
    AuthenticationController,
  ],
  providers: [
    MedicineGroupsService,
    MedicinesService,
    UsersService,
    MedicineGroupsRepository,
    MedicinesRepository,
    UsersRepository,
    PrismaService,
    AuthGuard,
    AuthenticationService,
  ],
  exports: [JwtModule, AuthenticationService],
})
export class AppModule {}
