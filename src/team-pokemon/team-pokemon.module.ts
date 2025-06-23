import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from 'src/team/entities/team.entity';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemonController } from './team-pokemon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPokemon, Team])],
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService],
})
export class TeamPokemonModule {}
