import { Injectable } from '@nestjs/common';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { UpdateTeamPokemonDto } from './dto/update-team-pokemon.dto';

@Injectable()
export class TeamPokemonService {
  create(createTeamPokemonDto: CreateTeamPokemonDto) {
    return 'This action adds a new teamPokemon';
  }

  findAll() {
    return `This action returns all teamPokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamPokemon`;
  }

  update(id: number, updateTeamPokemonDto: UpdateTeamPokemonDto) {
    return `This action updates a #${id} teamPokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamPokemon`;
  }
}
