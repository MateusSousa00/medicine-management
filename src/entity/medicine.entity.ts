import { ApiProperty } from '@nestjs/swagger';
import { Medicine } from '@prisma/client';

export class MedicineEntity implements Medicine {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  medicineGroupId: number;
}
