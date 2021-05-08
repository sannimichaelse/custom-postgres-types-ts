import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Price from '../interface/Price';


@Entity({name: "plans"})
export class Plan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "price",
        type: "text",
        transformer: {
          from: Price.fromPGCompositeType,
          to: Price.toPGCompositeType,
        }
    })
    price: Price = new Price("usd", 0);
}