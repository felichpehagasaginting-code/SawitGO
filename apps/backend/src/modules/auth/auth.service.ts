import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existing = await this.userRepo.findOne({
      where: [{ nip: dto.nip }, { email: dto.email }],
    });
    if (existing) {
      throw new ConflictException(
        'NIP atau Email sudah terdaftar dalam sistem.',
      );
    }

    const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
    if (!role) {
      throw new ConflictException(`Role ID ${dto.roleId} tidak ditemukan.`);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = this.userRepo.create({
      nip: dto.nip,
      fullName: dto.fullName,
      email: dto.email,
      passwordHash,
      roleId: dto.roleId,
      phoneNumber: dto.phoneNumber,
      assignedEstateId: dto.assignedEstateId,
      assignedAfdelingId: dto.assignedAfdelingId,
    });

    const saved = await this.userRepo.save(user);
    return {
      id: saved.id,
      nip: saved.nip,
      fullName: saved.fullName,
      email: saved.email,
      role: role.roleName,
      roleWeight: role.roleWeight,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { nip: dto.nip },
      relations: { role: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Kredensial tidak valid atau akun tidak aktif.',
      );
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Kredensial tidak valid.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      nip: user.nip,
      roleName: user.role.roleName,
      roleWeight: user.role.roleWeight,
      assignedEstateId: user.assignedEstateId,
      assignedAfdelingId: user.assignedAfdelingId,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        nip: user.nip,
        fullName: user.fullName,
        email: user.email,
        role: user.role.roleName,
        roleWeight: user.role.roleWeight,
        assignedEstateId: user.assignedEstateId,
        assignedAfdelingId: user.assignedAfdelingId,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { role: true },
    });
    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan.');
    }
    return {
      id: user.id,
      nip: user.nip,
      fullName: user.fullName,
      email: user.email,
      role: user.role.roleName,
      roleWeight: user.role.roleWeight,
      assignedEstateId: user.assignedEstateId,
      assignedAfdelingId: user.assignedAfdelingId,
    };
  }
}
