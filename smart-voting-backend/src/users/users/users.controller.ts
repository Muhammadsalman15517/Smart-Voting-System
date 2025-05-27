import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users - Retrieve all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // POST /users - Create a new user
  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return await this.usersService.createUser(userData);
  }

  // DELETE /users/:id - Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    return await this.usersService.deleteUser(id);
  }
}
