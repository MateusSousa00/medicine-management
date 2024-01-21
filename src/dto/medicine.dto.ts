import { ApiProperty } from '@nestjs/swagger';

//Modelo de corpo (json body) para o medicamento
export class MedicineDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  medicineGroupName?: string;

  @ApiProperty()
  medicineGroupId?: number;
}
