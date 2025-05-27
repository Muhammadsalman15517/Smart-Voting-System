import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // GET /users - Retrieve all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // POST /users - Create a new user
  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // DELETE /users/:id - Delete a user
  async deleteUser(id: number): Promise<string> {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected) {
      return `User with ID ${id} has been deleted.`;
    }
    return `User with ID ${id} not found.`;
  }
}
