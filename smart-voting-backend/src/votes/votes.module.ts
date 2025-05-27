import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VotesService } from './VotesService';
import { VotesController } from './votes.controller';
import { User } from '../users/users/user.entity';
import { Option } from '../options/option.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Vote, User, Option])],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
