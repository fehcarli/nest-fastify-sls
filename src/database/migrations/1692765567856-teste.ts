import { MigrationInterface, QueryRunner } from "typeorm";

export class Teste1692765567856 implements MigrationInterface {
    name = 'Teste1692765567856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
    }

}
