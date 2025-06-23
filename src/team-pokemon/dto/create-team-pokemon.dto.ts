import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTeamPokemonDto {
  @ApiProperty({ example: 'pikachu' })
  @IsNotEmpty()
  @IsString()
  pokemonIdOuNome: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  timeId: number;
}

