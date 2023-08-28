import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (username: string, password: string): Promise<boolean> => {
    if (
      this.configService.get<string>('HTTP_BASIC_USER') === username && 
      this.configService.get<string>('HTTP_BASIC_PASS') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
