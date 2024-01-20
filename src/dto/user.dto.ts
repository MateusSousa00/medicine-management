import { ApiProperty } from '@nestjs/swagger';
import { MedicineGroupDto } from './medicine-group.dto';

export class UserDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  medicineGroup?: MedicineGroupDto[];
}
