import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Product } from "../../products/entities/Product";

@Entity("stock")
@Unique(['product_id', 'location_id'])
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  product_id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column()
  location_id!: string;

  @Column()
  quantity!: number;

  @DeleteDateColumn()
  deletedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
}