import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

//const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-fastify-sls-db',
  synchronize: false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['database/migrations/**'],
};

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-fastify-sls-db',
  synchronize: false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['database/migrations/**'],
});
