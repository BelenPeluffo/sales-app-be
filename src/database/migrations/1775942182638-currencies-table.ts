import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CurrenciesTable1775942182638 implements MigrationInterface {
  private async createCurrenciesTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'currencies',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'text' },
        ],
      }),
      true,
    );
  }

  private async insertCurrencies(queryRunner: QueryRunner) {
    await queryRunner.query(`INSERT INTO sales_app.payment_methods (name)
      VALUES
      ('Pesos Argentinos'),
      ('Dólares estadounidenses'),
      ('Reales')`);
  }

  private async createCurrencyFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.payment_cash_breakdown',
      new TableForeignKey({
        columnNames: ['currency_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'currencies',
        referencedColumnNames: ['id'],
      }),
    );
  }

  private async dropCurrencyFK(queryRunner: QueryRunner) {
    const cashBreakdownTable = await queryRunner.getTable(
      'sales_app.payment_cash_breakdown',
    );
    const currencyIdFK = cashBreakdownTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('currency_id') !== -1,
    );
    if (currencyIdFK)
      await queryRunner.dropForeignKey(
        'sales_app.payment_cash_breakdown',
        currencyIdFK,
      );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createCurrenciesTable(queryRunner);
    await this.insertCurrencies(queryRunner);
    await this.createCurrencyFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropCurrencyFK(queryRunner);
    await queryRunner.dropTable('sales_app.currences');
  }
}
