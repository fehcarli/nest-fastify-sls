import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/lambda/user/services/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { AuthUserDto } from '../dto/auth-user.dto';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: AuthUserDto): Promise<User> {
    const { username } = payload;
    const user = await this.userService.findOneByEmail(username);
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
