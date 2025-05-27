import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Option])], // <-- THIS is required
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService], // optional if other modules need this
})
export class OptionsModule {}
