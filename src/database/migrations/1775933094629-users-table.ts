import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersTable1775933094629 implements MigrationInterface {
  private async createUsersTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          { name: 'nombre', type: 'text' },
          { name: 'password', type: 'text' },
          { name: 'user_role_id', type: 'integer' },
          { name: 'is_active', type: 'boolean', default: true },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUsersTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales_app.users');
  }
}
