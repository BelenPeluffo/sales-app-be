import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PaymentMethodsTable1775936505205 implements MigrationInterface {
  private async createPaymentMethodsTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'payment_methods',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'text', isNullable: false },
        ],
      }),
      true,
    );
  }

  private async insertPaymentMethods(queryRunner: QueryRunner) {
    await queryRunner.query(`INSERT INTO sales_app.payment_methods (name)
      VALUES
      ('Visa Electrón/Débito'),
      ('Visa Crédito'),
      ('MasterCard'),
      ('Maestro'),
      ('MCDebit'),
      ('Diners'),
      ('AMEX'),
      ('Pesos Argentinos'),
      ('Dólares estadounidenses'),
      ('Reales')`);
  }

  private async createPaymentMethodFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.payments',
      new TableForeignKey({
        columnNames: ['payment_method_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'payment_methods',
        referencedColumnNames: ['id'],
      }),
    );
  }

  private async dropPaymentMethodFK(queryRunner: QueryRunner) {
    const paymentsTable = await queryRunner.getTable('sales_app.payments');
    const paymentMethodIdFK = paymentsTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('payment_method_id') !== -1,
    );
    if (paymentMethodIdFK)
      await queryRunner.dropForeignKey('sales_app.payments', paymentMethodIdFK);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createPaymentMethodsTable(queryRunner);
    await this.insertPaymentMethods(queryRunner);
    await this.createPaymentMethodFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropPaymentMethodFK(queryRunner);
    await queryRunner.dropTable('sales_app.payment_methods');
  }
}
