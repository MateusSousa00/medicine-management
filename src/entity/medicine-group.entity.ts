import { ApiProperty } from '@nestjs/swagger';
import { MedicineGroup } from '@prisma/client';

//Entidade do grupo de medicamento referenciado diretamente na ORM Prisma
export class MedicineGroupEntity implements MedicineGroup {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: number;
}
