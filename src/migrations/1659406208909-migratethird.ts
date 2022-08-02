import {MigrationInterface, QueryRunner} from "typeorm";

export class migratethird1659406208909 implements MigrationInterface {
    name = 'migratethird1659406208909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "empno"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "empno" integer`);
    }

}
