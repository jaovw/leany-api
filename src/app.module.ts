import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { TrainerModule } from './trainer/trainer.module';
import { TeamModule } from './team/team.module';
import { TeamPokemonModule } from './team-pokemon/team-pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'database', 'db.sqlite'),
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    TrainerModule,
    TeamModule,
    TeamPokemonModule,
  ],
})
export class AppModule {}
