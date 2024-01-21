import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // Can activate 'e uma funcao que e padrao da interface Can Activate do NestJS
  // justamente para colocar a regra de autenticacao nesta funcao
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(req);
    if (!accessToken) {
      throw new UnauthorizedException('Token not found.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_TOKEN,
      });
      req['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  //Aqui utilizamos a Request do Express para facilidade de retirar o token JWT pela Header.
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
