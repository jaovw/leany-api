import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonIdOuNome: string;

  @ManyToOne(() => Team, (team) => team.pokemons, { onDelete: 'CASCADE' })
  time: Team;
}
