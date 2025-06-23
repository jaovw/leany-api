import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  create(dto: CreateTrainerDto): Promise<Trainer> {
    const trainer = this.trainerRepository.create(dto);
    return this.trainerRepository.save(trainer);
  }

  findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find({
      relations: ['times'], // opcional
    });
  }

  async findOne(id: number): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({
      where: { id },
      relations: ['times'],
    });
    if (!trainer) throw new NotFoundException('Treinador não encontrado');
    return trainer;
  }

  async update(id: number, dto: UpdateTrainerDto): Promise<Trainer> {
    const trainer = await this.findOne(id);
    Object.assign(trainer, dto);
    return this.trainerRepository.save(trainer);
  }

  async remove(id: number): Promise<void> {
    const trainer = await this.findOne(id);
    await this.trainerRepository.remove(trainer);
  }
}
