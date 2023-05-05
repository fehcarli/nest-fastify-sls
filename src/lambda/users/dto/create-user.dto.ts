import { IsEmail, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({
        message: 'Informe o nome do usuário',
    })
    @MaxLength(50, {
        message: 'O nome deve ter menos de 50 caracteres',
    })
    firstname: string;

    @IsNotEmpty({
        message: 'Informe o nome do usuário',
    })
    @MaxLength(50, {
        message: 'O sobrenome deve ter menos de 50 caracteres',
    })
    lastname: string;

    @IsNotEmpty({
        message: 'Informe um endereço de email',
    })
    @IsEmail({}, {
        message: 'Informe um endereço de email válido',
    })
    @MaxLength(50, {
        message: 'O endereço de email deve ter menos de 200 caracteres',
    })
    email: string;
    
    @IsNotEmpty({
        message: 'Informe uma senha',
    })
    @MinLength(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
    password: string;
    
    @IsNotEmpty({
        message: 'Informe uma senha',
    })
    @MinLength(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
    passwordConfirmation: string;

    @IsNotEmpty({
        message: 'Informe permissão',
    })
    @IsNumber()  
    role: number;
}
