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

  // [joaovictor - 23/06/2025] Criar Pokémon em um time (valida e adiciona)
  @Post('/team/:teamId')
  async addPokemonToTeam(
    @Param('teamId') teamId: string,
    @Body('pokemonIdOuNome') pokemonIdOuNome: string,
  ) {
    await this.service.validatePokemonExists(pokemonIdOuNome);

    return this.service.create({
      pokemonIdOuNome,
      timeId: +teamId,
    });
  }


  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  // [joaovictor - 23/06/2025] Listar Pokémons de um time com enriquecimento
  @Get('/team/:teamId')
  async listByTeam(@Param('teamId') teamId: string) {
    return this.service.listEnrichedByTeam(+teamId);
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
