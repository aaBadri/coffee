import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDescFromCoffee1697528015514 implements MigrationInterface {
    name = 'RemoveDescFromCoffee1697528015514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "folan"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "folan" character varying`);
    }

}
