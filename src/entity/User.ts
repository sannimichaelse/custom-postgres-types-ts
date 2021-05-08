import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import DateOfBirth from '../interface/DateOfBirth'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    age: number;

    @Column({
        name: "date_of_birth",
        type: "text",
        transformer: {
          from: DateOfBirth.fromPGCompositeType,
          to: DateOfBirth.toPGCompositeType,
        }
    })
    date_of_birth: DateOfBirth = new DateOfBirth(1, "jul", "2020");
}
