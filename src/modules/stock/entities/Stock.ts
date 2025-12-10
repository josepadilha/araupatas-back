import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  product_id!: string;

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