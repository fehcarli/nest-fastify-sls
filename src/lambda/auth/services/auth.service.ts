import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
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
        secret: '',
        expiresIn: '60s',
      },
    );

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: '',
        expiresIn: '60s',
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
