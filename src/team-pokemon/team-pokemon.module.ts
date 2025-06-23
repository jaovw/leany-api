import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from 'src/team/entities/team.entity';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemonController } from './team-pokemon.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamPokemon, Team]),
    HttpModule,
  ],
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService],
})
export class TeamPokemonModule {}
