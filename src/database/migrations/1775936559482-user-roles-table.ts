import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class UserRolesTable1775936559482 implements MigrationInterface {
  private async createUserRolesTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        schema: 'sales_app',
        name: 'user_roles',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'text', isNullable: false },
          { name: 'is_active', type: 'boolean', default: true },
        ],
      }),
      true,
    );
  }

  private async insertUserRoles(queryRunner: QueryRunner) {
    await queryRunner.query(`INSERT INTO sales_app.user_roles (name)
        VALUES
        ('Administradxr'),
        ('Cajerx')     
        `);
  }

  private async createUserRoleFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'sales_app.users',
      new TableForeignKey({
        columnNames: ['user_role_id'],
        referencedSchema: 'sales_app',
        referencedTableName: 'user_roles',
        referencedColumnNames: ['id'],
      }),
    );
  }

  private async dropUserRoleFK(queryRunner: QueryRunner) {
    const usersTable = await queryRunner.getTable('sales_app.users');
    const UserRoleIdFK = usersTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_role_id') !== -1,
    );
    if (UserRoleIdFK)
      await queryRunner.dropForeignKey('sales_app.users', UserRoleIdFK);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUserRolesTable(queryRunner);
    await this.insertUserRoles(queryRunner);
    await this.createUserRoleFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropUserRoleFK(queryRunner);
    await queryRunner.dropTable('sales_app.user_roles');
  }
}
