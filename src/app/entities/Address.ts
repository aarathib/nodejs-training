import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("address")
    export default class Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public addr1: string;
        @Column({ nullable: false })
        public addr2: string;
        @Column({ nullable: false })
        public city: string;
        @Column({ nullable: false })
        public state: string;
        @Column({ nullable: false })
        public country: string;
        @Column({ nullable: false })
        public pincode: string;

}