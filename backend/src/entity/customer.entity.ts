import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity( 'customer' )
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    cid: number

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    dob: string

}
