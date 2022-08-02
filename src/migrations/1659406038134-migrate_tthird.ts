import {MigrationInterface, QueryRunner} from "typeorm";

export class migrateTthird1659406038134 implements MigrationInterface {
    name = 'migrateTthird1659406038134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "empno" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "empno"`);
    }

}
