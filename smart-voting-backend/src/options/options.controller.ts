import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.optionsService.create(name);
  }

  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Delete(':id') 
  delete(@Param('id') id: number) {
    return this.optionsService.delete(id);
  }
}
