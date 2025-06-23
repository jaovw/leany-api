import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTeamPokemonDto {
  @IsNotEmpty()
  @IsString()
  pokemonIdOuNome: string;

  @IsInt()
  @Min(1)
  timeId: number;
}
