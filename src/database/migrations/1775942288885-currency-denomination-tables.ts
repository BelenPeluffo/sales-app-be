import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CurrencyDenominationTables1775942288885 implements MigrationInterface {
  private async createDenominationTables(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'usd_denominations',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'text' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'pesos_arg_denominations',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'text' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'reais_denominations',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'text' },
        ],
      }),
      true,
    );
  }

  private async insertDenominations(queryRunner: QueryRunner) {
    await queryRunner.query(`INSERT INTO sales_app.usd_denominations (name)
        VALUES
        (1),
        (2),
        (5),
        (10),
        (20),
        (50),
        (100)`);
    await queryRunner.query(
      `INSERT INTO sales_app.pesos_arg_denominations (name)
      VALUES
        (100),
        (200),
        (500),
        (1000),
        (5000),
        (10000),
        (20000)`,
    );
    await queryRunner.query(
      `INSERT INTO sales_app.reais_denominations (name)
      VALUES
        (2),
        (5),
        (10),
        (20),
        (50),
        (100),
        (200)`,
    );
  }

  private async dropDenominationTables(queryRunner: QueryRunner) {
    await queryRunner.dropTable('sales_app.usd_denominations');
    await queryRunner.dropTable('sales_app.pesos_arg_denominations');
    await queryRunner.dropTable('sales_app.reais_denominations');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createDenominationTables(queryRunner);
    await this.insertDenominations(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropDenominationTables(queryRunner);
  }
}
