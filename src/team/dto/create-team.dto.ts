import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Time Elétrico' })
  @IsNotEmpty()
  @IsString()
  nomeDoTime: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  treinadorId: number;
}
