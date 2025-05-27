import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepo: Repository<Option>,
  ) {}

  create(name: string) {
    const option = this.optionRepo.create({ name });
    return this.optionRepo.save(option);
  }

  findAll() {
    return this.optionRepo.find();
  }

  delete(id: number) {
    return this.optionRepo.delete(id);
  }
}
