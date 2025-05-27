import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users/users.module';  // Path yahan correct kar diya
import { VotesModule } from './votes/votes.module';
import { OptionsModule } from './options/options.module';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '15517', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      
      autoLoadEntities: true,
      synchronize: true,      
    }),
    UsersModule,
    VotesModule,
    OptionsModule,
    
  ],
   controllers: [AuthController],
})
export class AppModule {}
