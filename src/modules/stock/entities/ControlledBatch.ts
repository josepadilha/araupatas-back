import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../products/entities/Product";
import { StockLocation } from "./StockLocation";

@Entity("controlled_batches")
export class ControlledBatch {
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
  batch_number!: string;

  @Column({ type: 'date' })
  expiration_date!: string;

  @Column("int")
  initial_quantity!: number;

  @Column("int")
  current_quantity!: number;

  @Column({ nullable: true })
  nf_number?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
