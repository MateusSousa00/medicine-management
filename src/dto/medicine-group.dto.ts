import { ApiProperty } from '@nestjs/swagger';
import { MedicineDto } from './medicine.dto';

//Modelo de corpo (json body) para os grupos de medicamentos
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
