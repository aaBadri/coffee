import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescToCoffee1697527855938 implements MigrationInterface {
  name = 'AddDescToCoffee1697527855938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "folan" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "folan"`);
  }
}
