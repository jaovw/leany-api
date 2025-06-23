import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamPokemonService } from './team-pokemon.service';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { UpdateTeamPokemonDto } from './dto/update-team-pokemon.dto';

@Controller('team-pokemon')
export class TeamPokemonController {
  constructor(private readonly teamPokemonService: TeamPokemonService) {}

  @Post()
  create(@Body() createTeamPokemonDto: CreateTeamPokemonDto) {
    return this.teamPokemonService.create(createTeamPokemonDto);
  }

  @Get()
  findAll() {
    return this.teamPokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamPokemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamPokemonDto: UpdateTeamPokemonDto) {
    return this.teamPokemonService.update(+id, updateTeamPokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamPokemonService.remove(+id);
  }
}
