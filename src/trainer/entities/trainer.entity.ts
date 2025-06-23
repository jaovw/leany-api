import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  cidadeOrigem?: string;

  @OneToMany(() => Team, (team) => team.treinador)
  times: Team[];
}
