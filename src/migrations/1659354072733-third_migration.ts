import {MigrationInterface, QueryRunner} from "typeorm";

export class thirdMigration1659354072733 implements MigrationInterface {
    name = 'thirdMigration1659354072733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
    }

}
