import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTrainerDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  cidadeOrigem?: string;
}
