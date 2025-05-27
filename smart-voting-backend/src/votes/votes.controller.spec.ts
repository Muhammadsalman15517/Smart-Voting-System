import { Controller, Get, Post, Body } from '@nestjs/common';
import { VotesService } from './VotesService';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  // GET /votes → raw vote list 
  @Get()
  async all() {
    return this.votesService.findAll();
  }

  // POST /votes → body: { option, userId }
  @Post()
  async vote(
    @Body('option') option: string,
    @Body('userId') userId: number,
  ) {
    return this.votesService.submitVote(option, userId);
  }

  // GET /votes/tally → counts per option
  @Get('tally')
  async tally() {
    return this.votesService.tally();
  }
}
