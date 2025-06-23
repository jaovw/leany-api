import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const treinador = await this.trainerRepository.findOneBy({ id: createTeamDto.treinadorId });
    if (!treinador) throw new NotFoundException('Treinador não encontrado');

    const team = this.teamRepository.create({
      nomeDoTime: createTeamDto.nomeDoTime,
      treinador,
    });

    return this.teamRepository.save(team);
  }

  findAll(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ['treinador'],
    });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['treinador'],
    });
    if (!team) throw new NotFoundException('Time não encontrado');
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);

    if (updateTeamDto.treinadorId) {
      const novoTreinador = await this.trainerRepository.findOneBy({ id: updateTeamDto.treinadorId });
      if (!novoTreinador) throw new NotFoundException('Novo treinador não encontrado');
      team.treinador = novoTreinador;
    }

    if (updateTeamDto.nomeDoTime) {
      team.nomeDoTime = updateTeamDto.nomeDoTime;
    }

    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
  }
}
