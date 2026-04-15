import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Product } from "../../products/entities/Product";
import { StockLocation } from "./StockLocation";
import { User } from "../../users/entities/User";
import { ControlledBatch } from "./ControlledBatch";

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

  @Column({ nullable: true, type: 'text' })
  observation!: string | null;

  @Column({ nullable: true })
  batch_id?: string | null;

  @ManyToOne(() => ControlledBatch, { nullable: true })
  @JoinColumn({ name: "batch_id" })
  batch?: ControlledBatch | null;

  @Column({ nullable: true, type: 'text' })
  patient_name?: string | null;

  @Column({ nullable: true, type: 'text' })
  responsible_name?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
