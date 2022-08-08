import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import Address from "./Address";
import Department from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
        @Column({ nullable: false })
        public username: string;
        @Column({ nullable: false })
        public password: string;
        @Column({ nullable: false })
        public joindate: string;
        // @Column({ nullable: false })
        // public experience: number;
        @Column({ nullable: false, type: "float" })
        public experience: number;
        @Column({ nullable: false })
        public role: string;
        @Column({ nullable: false })
        public status: string;

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
        @Column({ nullable: false })
        public departmentId: string;

        @OneToOne(() => Address, { cascade: true })
        @JoinColumn()
        public address: Employee;
        @Column({ nullable: false })
        public addressId: string;
}