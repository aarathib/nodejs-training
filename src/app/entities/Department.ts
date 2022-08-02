import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("department")
    export default class Department extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
    //     @Column({ nullable: true })
    //     public empno: number;


    //     @OneToMany(() => Employee, (employee) => employee.department)
    // @JoinColumn()
    // public employee: Employee[];
}