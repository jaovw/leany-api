import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TeamPokemonService } from './team-pokemon.service';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { UpdateTeamPokemonDto } from './dto/update-team-pokemon.dto';

@Controller('team-pokemons')
export class TeamPokemonController {
  constructor(private readonly service: TeamPokemonService) {}

  @Post()
  create(@Body() dto: CreateTeamPokemonDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeamPokemonDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
