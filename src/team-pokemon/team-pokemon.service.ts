import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from 'src/team/entities/team.entity';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { UpdateTeamPokemonDto } from './dto/update-team-pokemon.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TeamPokemonService {
  constructor(
    @InjectRepository(TeamPokemon)
    private teamPokemonRepository: Repository<TeamPokemon>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    private httpService: HttpService,
  ) {}

  async create(dto: CreateTeamPokemonDto): Promise<TeamPokemon> {
    const time = await this.teamRepository.findOne({
      where: { id: dto.timeId },
      relations: ['pokemons'],
    });
    if (!time) throw new NotFoundException('Time não encontrado');

    if (time.pokemons.length >= 6) {
      throw new BadRequestException('Limite de 6 pokémons por time atingido.');
    }

    const pokemon = this.teamPokemonRepository.create({
      pokemonIdOuNome: dto.pokemonIdOuNome,
      time,
    });

    return this.teamPokemonRepository.save(pokemon);
  }

  findAll(): Promise<TeamPokemon[]> {
    return this.teamPokemonRepository.find({
      relations: ['time'],
    });
  }

  async findOne(id: number): Promise<TeamPokemon> {
    const pokemon = await this.teamPokemonRepository.findOne({
      where: { id },
      relations: ['time'],
    });
    if (!pokemon) throw new NotFoundException('TeamPokemon não encontrado');
    return pokemon;
  }

  async update(id: number, dto: UpdateTeamPokemonDto): Promise<TeamPokemon> {
    const teamPokemon = await this.findOne(id);

    if (dto.pokemonIdOuNome) {
      teamPokemon.pokemonIdOuNome = dto.pokemonIdOuNome;
    }

    if (dto.timeId && dto.timeId !== teamPokemon.time.id) {
      const novoTime = await this.teamRepository.findOne({
        where: { id: dto.timeId },
        relations: ['pokemons'],
      });
      if (!novoTime) throw new NotFoundException('Novo time não encontrado');
      if (novoTime.pokemons.length >= 6) {
        throw new BadRequestException('Novo time já possui 6 pokémons.');
      }
      teamPokemon.time = novoTime;
    }

    return this.teamPokemonRepository.save(teamPokemon);
  }

  async remove(id: number): Promise<void> {
    const teamPokemon = await this.findOne(id);
    await this.teamPokemonRepository.remove(teamPokemon);
  }

  async validatePokemonExists(pokemonIdOuNome: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOuNome.toLowerCase()}`)
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException(`Pokémon "${pokemonIdOuNome}" não encontrado na PokéAPI`);
    }
  }

  async listEnrichedByTeam(teamId: number) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['pokemons'],
    });

    if (!team) throw new NotFoundException('Time não encontrado');

    const enriched = await Promise.all(
      team.pokemons.map(async (pokemon) => {
        const pokeData = await this.validatePokemonExists(pokemon.pokemonIdOuNome);
        return {
          id: pokemon.id,
          nome: pokeData.name,
          tipos: pokeData.types.map((t) => t.type.name),
          sprite: pokeData.sprites.front_default,
        };
      })
    );

    return enriched;
  }
}
