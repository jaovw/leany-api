import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamPokemonDto } from './create-team-pokemon.dto';

export class UpdateTeamPokemonDto extends PartialType(CreateTeamPokemonDto) {}
