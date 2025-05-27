import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    if (username === 'admin' && password === '1234') {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  }
}
