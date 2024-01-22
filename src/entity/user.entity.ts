import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

//Entidade do usuário referenciado diretamente na ORM Prisma
export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
