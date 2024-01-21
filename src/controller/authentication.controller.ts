import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { AuthenticationService } from 'src/service/authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  //Nossa unica rota nao autenticada, justamente para o usuario gerar seu token JWT
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }
}
