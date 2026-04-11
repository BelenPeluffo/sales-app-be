import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class TransactionsTable1775936468587 implements MigrationInterface {
  private async createTransactionsTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'cierre_id',
            type: 'integer',
            isNullable: false,
          },
          { name: 'income', type: 'numeric', isNullable: false },
          { name: 'expense', type: 'numeric', isNullable: true },
          { name: 'total', type: 'numeric' },
          { name: 'has_foreign_exchange', type: 'boolean', isNullable: true },
          { name: 'has_observations', type: 'boolean', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );
  }

  private async createCierreFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.transactions',
      new TableForeignKey({
        columnNames: ['cierre_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'cierres',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  private async dropCierreFK(queryRunner: QueryRunner) {
    const transactionsTable = await queryRunner.getTable(
      'sales_app.transactions',
    );
    const cierreIdFK = transactionsTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('cierre_id') !== -1,
    );
    if (cierreIdFK)
      await queryRunner.dropForeignKey('sales_app.transactions', cierreIdFK);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTransactionsTable(queryRunner);
    await this.createCierreFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropCierreFK(queryRunner);
    await queryRunner.dropTable('sales_app.transactions');
  }
}
