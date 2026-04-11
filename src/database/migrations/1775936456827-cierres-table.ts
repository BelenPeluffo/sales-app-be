import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CierresTable1775936456827 implements MigrationInterface {
  private async createCierresTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'cierres',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          { name: 'date', type: 'date', isUnique: true },
          { name: 'user_id', type: 'integer' },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'initial_amount',
            type: 'numeric',
          },
          {
            name: 'recorded_total',
            type: 'numeric',
          },
          {
            name: 'counted_total',
            type: 'numeric',
          },
          {
            name: 'count_difference',
            type: 'numeric',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'closed_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  private async createUserFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.cierres',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  private async dropUserFK(queryRunner: QueryRunner) {
    const cierresTable = await queryRunner.getTable('sales_app.cierres');
    const userIdFK = cierresTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    if (userIdFK)
      await queryRunner.dropForeignKey('sales_app.cierres', userIdFK);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createCierresTable(queryRunner);
    await this.createUserFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropUserFK(queryRunner);
    await queryRunner.dropTable('sales_app.cierres');
  }
}
