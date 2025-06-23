import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Trainers')
@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar treinador' })
  @ApiBody({ type: CreateTrainerDto })
  @ApiResponse({ status: 201, description: 'Treinador criado com sucesso' })
  create(@Body() dto: CreateTrainerDto) {
    return this.trainerService.create(dto);
  }

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrainerDto) {
    return this.trainerService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainerService.remove(+id);
  }
}
