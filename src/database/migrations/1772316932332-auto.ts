import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1772316932332 implements MigrationInterface {
  name = 'Auto1772316932332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales_app"."cierres" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "totalDeclarado" numeric(12,2) NOT NULL, "totalSistema" numeric(12,2) NOT NULL, "diferencia" numeric(12,2), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d581713e75def51ce8cbfd9b57d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_app"."movimientos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monto" numeric(12,2) NOT NULL, "medioPago" character varying(50) NOT NULL, "fecha" date NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cierre_id" integer, CONSTRAINT "PK_519702aa97def3e7c1b6cc5e2f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_app"."movimientos" ADD CONSTRAINT "FK_ac5a44e919f9e8a4fdb1ad9daf4" FOREIGN KEY ("cierre_id") REFERENCES "sales_app"."cierres"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_app"."movimientos" DROP CONSTRAINT "FK_ac5a44e919f9e8a4fdb1ad9daf4"`,
    );
    await queryRunner.query(`DROP TABLE "sales_app"."movimientos"`);
    await queryRunner.query(`DROP TABLE "sales_app"."cierres"`);
  }
}
