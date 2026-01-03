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
  created_by!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  user!: User;

  @Column("int")
  quantity!: number;

  @Column()
  type!: string

  @CreateDateColumn()
  createdAt!: Date;
}
