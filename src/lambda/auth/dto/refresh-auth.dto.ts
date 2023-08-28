import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshAuthDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    refresh_token: string;
}