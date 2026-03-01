import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueOpenCierre1699999999999 implements MigrationInterface {
  name = 'AddUniqueOpenCierre1699999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE UNIQUE INDEX unique_open_cierre
      ON sales_app.cierres (estado)
      WHERE estado = 'abierto'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX sales_app.unique_open_cierre
    `);
  }
}
