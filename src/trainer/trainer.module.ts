import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trainer } from './entities/trainer.entity';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainerController],
  providers: [TrainerService],
  exports: [TypeOrmModule], // só se for usar em outros módulos
})
export class TrainerModule {}
