import { TeamPokemon } from 'src/team-pokemon/entities/team-pokemon.entity';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeDoTime: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.times, { onDelete: 'CASCADE' })
  treinador: Trainer;

  @OneToMany(() => TeamPokemon, (tp) => tp.time)
  pokemons: TeamPokemon[];
}
