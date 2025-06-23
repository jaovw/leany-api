import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from './entities/team.entity';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Trainer])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
