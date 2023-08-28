import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('login')
    async login(@Body() { username, password }: AuthUserDto){
        return await this.authService.validateUser(username, password);
    }

    @Post('refresh')
    async refreshToken(@Body() body: any){
        return await this.authService.refreshToken(body);
    }
}
