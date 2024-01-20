import { ApiProperty } from '@nestjs/swagger';
import { MedicineGroup } from '@prisma/client';

export class MedicineGroupEntity implements MedicineGroup {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: number;
}
