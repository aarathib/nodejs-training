import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddress31659519584680 implements MigrationInterface {
    name = 'addAddress31659519584680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "empno"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "empno" integer`);
    }

}
