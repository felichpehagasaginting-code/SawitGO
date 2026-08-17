import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({
    example: 'felich@sawitgo.cwe.ac.id',
    description: 'Email akun Google terverifikasi',
  })
  @IsEmail({}, { message: 'Format email Google tidak valid' })
  @IsNotEmpty({ message: 'Email Google wajib diisi' })
  email: string;

  @ApiPropertyOptional({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...',
    description: 'Firebase ID Token dari Google Sign-In SDK',
  })
  @IsOptional()
  @IsString()
  idToken?: string;
}
