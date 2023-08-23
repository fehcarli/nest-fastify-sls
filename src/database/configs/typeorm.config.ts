import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['database/migrations/**'],
};

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/database/migrations/**'],
});
