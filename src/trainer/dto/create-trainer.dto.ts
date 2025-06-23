import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({ example: 'Ash Ketchum', description: 'Nome do treinador' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ example: 'Pallet Town', description: 'Cidade de origem do treinador', required: false })
  @IsOptional()
  @IsString()
  cidadeOrigem?: string;
}
