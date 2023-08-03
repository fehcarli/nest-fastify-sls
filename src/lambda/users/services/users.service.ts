import { ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserRole } from '../enum/user-roles.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto, role: UserRole): Promise<User> {
      const { firstname, lastname, email, password } = createUserDto;
      const user = this.userRepository.create()
      
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      user.role = role;
      user.status = true;
      user.confirmationToken = crypto.randomBytes(32).toString('hex');

      try {
        await user.save();
        delete user.password;
        delete user.salt;
        return user;
      } catch (error) {
        if (error.code.toString() === '23505') {
          throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }
  
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else if(createUserDto.role === 1) {
      return this.createUser(createUserDto, UserRole.ADMIN);
    } else {
      return this.createUser(createUserDto, UserRole.USER);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()
    return users;
  }

  findOneByEmail(username: string) {
    return this.userRepository.findOneBy({ email: username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
