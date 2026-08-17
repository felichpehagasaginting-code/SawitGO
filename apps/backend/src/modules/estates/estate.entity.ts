import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Afdeling } from './afdeling.entity';

@Entity('estates')
export class Estate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
    nullable: true,
  })
  boundary: any;

  @Column({
    name: 'total_area_hectares',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalAreaHectares: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Afdeling, (afdeling) => afdeling.estate)
  afdelings: Afdeling[];
}
