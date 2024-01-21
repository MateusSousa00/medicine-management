import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  //Nesta funcao e feita a validacao dos dados passados no login para verificacao se existe
  // o usuario no banco de dados e ele pode acessar as rotas da API
  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByUsername(dto.username);
    if (user.password !== dto.password) {
      throw new UnauthorizedException('Please, provide the right credentials.');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
