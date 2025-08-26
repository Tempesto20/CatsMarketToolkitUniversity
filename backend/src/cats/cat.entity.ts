import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('cat')
export class Cat {
  @PrimaryColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  img: string;

  @Column({ default: 0 })
  discount: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  age: number;

  @Column({ length: 50 })
  buy: string;

  @Column({ nullable: true }) 
  isSell: number;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ length: 100 })
  breed: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}