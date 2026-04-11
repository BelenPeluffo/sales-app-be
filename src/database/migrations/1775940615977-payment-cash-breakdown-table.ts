import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PaymentCashBreakdownTable1775940615977 implements MigrationInterface {
  private async createPaymentCashBreakdownTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'payment_cash_breakdown',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'payment_id', type: 'integer' },
          { name: 'currency_id', type: 'integer' },
          { name: 'denomination', type: 'numeric' },
          { name: 'quantity', type: 'numeric' },
        ],
      }),
      true,
    );
  }

  private async createPaymentFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.payment_cash_breakdown',
      new TableForeignKey({
        columnNames: ['payment_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'payments',
        referencedColumnNames: ['id'],
      }),
    );
  }

  private async dropPaymentFK(queryRunner: QueryRunner) {
    const cashBreakdownTable = await queryRunner.getTable(
      'sales_app.payment_cash_breakdown',
    );
    const paymentIdFK = cashBreakdownTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('payment_id') !== -1,
    );
    if (paymentIdFK)
      await queryRunner.dropForeignKey(
        'sales_app.payment_cash_breakdown',
        paymentIdFK,
      );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createPaymentCashBreakdownTable(queryRunner);
    await this.createPaymentFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropPaymentFK(queryRunner);
    await queryRunner.dropTable('payment_cash_breakdown');
  }
}
