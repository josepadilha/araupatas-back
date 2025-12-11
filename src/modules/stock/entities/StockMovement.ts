import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Product } from "../../products/entities/Product";
import { StockLocation } from "./StockLocation";
import { User } from "../../users/entities/User";

@Entity("stock_movements")
export class StockMovement {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  product_id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column()
  location_id!: string;

  @ManyToOne(() => StockLocation)
  @JoinColumn({ name: "location_id" })
  location!: StockLocation;

  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column("int")
  quantity!: number; // positivo = entrada, negativo = saída

  @Column()
  type!: string //"IN" | "OUT" | "TRANSFER" | "ADJUST";

  @CreateDateColumn()
  createdAt!: Date;
}
