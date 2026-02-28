import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CierreMovimientoTables1772317738478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
          { name: 'fecha', type: 'date', isUnique: true },
          {
            name: 'estado',
            type: 'enum',
            enum: ['abierto', 'cerrado'],
            default: "'abierto'",
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
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

    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'movimientos',
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
          { name: 'fecha', type: 'date', default: 'CURRENT_DATE' },
          { name: 'hora', type: 'timestamptz', default: 'now()' },
          { name: 'medio_pago_id', type: 'uuid' },
          { name: 'monto', type: 'numeric' },
          { name: 'observacion', type: 'text', isNullable: true },
          { name: 'activo', type: 'boolean', default: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'sales_app.movimientos',
      new TableForeignKey({
        columnNames: ['cierre_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'cierres',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('sales_app.movimientos');
    const fk = table.foreignKeys.find(
      (f) => f.columnNames.indexOf('cierre_id') !== -1,
    );
    if (fk) {
      await queryRunner.dropForeignKey('sales_app.movimientos', fk);
    }
    await queryRunner.dropTable('sales_app.movimientos');
    await queryRunner.dropTable('sales_app.cierres');
  }
}
