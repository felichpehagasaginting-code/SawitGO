import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '202515026', description: 'Nomor Induk Pegawai' })
  @IsString()
  @IsNotEmpty()
  nip: string;

  @ApiProperty({ example: 'RahasiaKebun2026!', description: 'Password akun' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
