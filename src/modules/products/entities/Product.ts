import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { ProductUnit } from "./ProductUnit";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  category_id!: string;

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: "category_id" })
  category!: ProductCategory;

  @Column({ nullable: true })
  description?: string;
  
  @Column({ nullable: true })
  sku?: string;

  @Column()
  unit_id!: string;

  @ManyToOne(() => ProductUnit)
  @JoinColumn({ name: "unit_id" })
  unit!: ProductUnit;

  @Column("int")
  min_quantity!: number;

  @DeleteDateColumn()
  deletedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
