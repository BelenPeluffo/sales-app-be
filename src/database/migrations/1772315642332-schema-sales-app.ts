import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSalesApp1772315642332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS sales_app;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP SCHEMA IF EXISTS sales_app CASCADE;
  `);
  }
}
