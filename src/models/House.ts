import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('houses')
export default class House {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  proprietario: string

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  descricao: string;

  @Column()
  whatsapp: string;

  @Column()
  valor: string;

  @OneToMany(() => Image, image => image.house, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'house_id' })
  images: Image[];
}