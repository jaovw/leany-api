import { Module } from '@nestjs/common';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemonController } from './team-pokemon.controller';

@Module({
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService],
})
export class TeamPokemonModule {}
