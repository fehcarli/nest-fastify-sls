import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.password === password) {
      return await this.generateToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async generateToken(payload: User) {
    const accessToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.SECRET,
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '1h',
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async checkRefreshToken(body: { refresh_token: any; }){
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  async refreshUser(body: any) {
    const payload: User = await this.checkRefreshToken(body); ////este método também será implementado abaixo
    return this.generateToken(payload);
  }
}
