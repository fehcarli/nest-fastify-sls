import { User } from "src/database/entities/user.entity";

export class ReturnUserDto {
    user: User;
    message: string;
}