import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { CreateVoteDto } from './vote.dto';
import { User } from '../users/users/user.entity';
import { Option } from '../options/option.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async create(dto: CreateVoteDto): Promise<Vote> {
    // Step 1: Find or create user by CNIC
    let user = await this.userRepository.findOne({ where: { nic: dto.user } });
    if (!user) {
      user = this.userRepository.create({ nic: dto.user });
      user = await this.userRepository.save(user);
    }

    // Step 2: Check for duplicate vote
    const existingVote = await this.voteRepository.findOne({ where: { user: { id: user.id } } });
    if (existingVote) {
      throw new Error('This CNIC has already cast a vote');
    }

    // Step 3: Validate Option
    const option = await this.optionRepository.findOneBy({ id: dto.optionId });
    if (!option) {
      throw new Error('Selected candidate not found');
    }

    // Step 4: Create vote
    const vote = this.voteRepository.create({ user, option });
    return this.voteRepository.save(vote);
  }

  async findAll(): Promise<Vote[]> {
    return this.voteRepository.find({ relations: ['user', 'option'] });
  }

  async tally(): Promise<{ option: string; count: number }[]> {
    return this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.option', 'option')
      .select('option.name', 'option')
      .addSelect('COUNT(*)', 'count')
      .groupBy('option.name')
      .getRawMany();
  }

  async getVotedCNICs(): Promise<string[]> {
    const votes = await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.user', 'user')
      .select('user.nic', 'nic')
      .getRawMany();

    return votes.map(v => v.nic);
  }
}
