import { IsString, Length } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @Length(1, 100)
  name: string;
}
