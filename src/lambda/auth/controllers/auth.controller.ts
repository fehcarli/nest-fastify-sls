import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('login')
    async login(@Body() body: AuthUserDto){
        return await this.authService.validateUser(body.username, body.password);
    }

    @Post('refresh')
    async reanthenticate(@Body() body: any){
        return await this.authService.reauthenticate(body);
    }
}
