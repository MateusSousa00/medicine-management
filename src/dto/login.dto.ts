import { ApiProperty } from '@nestjs/swagger';

//Modelo de corpo (json body) para o login
export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
