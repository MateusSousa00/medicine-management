import { ApiProperty } from '@nestjs/swagger';
import { MedicineDto } from './medicine.dto';

export class MedicineGroupDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  medicines?: MedicineDto[];
}
