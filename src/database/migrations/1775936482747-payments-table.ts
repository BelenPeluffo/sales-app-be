import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PaymentsTable1775936482747 implements MigrationInterface {
  private async createPaymentsTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'transaction_id',
            type: 'integer',
            isNullable: false,
          },
          { name: 'transaction_type', type: 'numeric', default: 1 },
          { name: 'payment_method_id', type: 'integer' },
          { name: 'total', type: 'numeric' },
          { name: 'observations', type: 'text', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );
  }

  private async createTransactionFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.payments',
      new TableForeignKey({
        columnNames: ['transaction_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'transactions',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  private async dropTransactionFK(queryRunner: QueryRunner) {
    const paymentsTable = await queryRunner.getTable('sales_app.payments');
    const transactionIdFK = paymentsTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('transaction_id') !== -1,
    );
    if (transactionIdFK)
      await queryRunner.dropForeignKey('sales_app.payments', transactionIdFK);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createPaymentsTable(queryRunner);
    await this.createTransactionFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropTransactionFK(queryRunner);
    await queryRunner.dropTable('sales_app.payments');
  }
}
