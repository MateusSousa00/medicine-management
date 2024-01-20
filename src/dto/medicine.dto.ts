import { ApiProperty } from '@nestjs/swagger';

export class MedicineDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  medicineGroupId: number;
}
