import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: '202515026' })
  @IsString()
  @IsNotEmpty()
  nip: string;

  @ApiProperty({ example: 'Felich Pehagasa Ginting' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'felich@sawitgo.cwe.ac.id' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'RahasiaKebun2026!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 3,
    description: '1=Krani, 2=Mandor, 3=Asisten, 4=Askep, 5=Manager',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  roleId: number;

  @ApiProperty({ example: '081234567890', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'a8098c1a-f86e-11da-bd1a-00112444be1e',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignedEstateId?: string;

  @ApiProperty({
    example: 'b8098c1a-f86e-11da-bd1a-00112444be1e',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignedAfdelingId?: string;
}
