import { Controller, Get, Post, Body } from '@nestjs/common';
import { VotesService } from './VotesService';
import { CreateVoteDto } from './vote.dto';


@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() dto: CreateVoteDto) {
    return this.votesService.create(dto);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Get('results')
  tally() {
    return this.votesService.tally();
  }
@Get('voted-cnic')
async getVotedCNICs() {
  return this.votesService.getVotedCNICs();
}


}