import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  nomeDoTime: string;

  @IsInt()
  @Min(1)
  treinadorId: number;
}
