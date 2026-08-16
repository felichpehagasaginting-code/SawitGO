import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  nip: string;
  roleName: string;
  roleWeight: number;
  assignedEstateId?: string;
  assignedAfdelingId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'super_secret_jwt_signing_key_at_least_32_chars_long_12345'),
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Token tidak valid.');
    }
    return {
      id: payload.sub,
      nip: payload.nip,
      roleName: payload.roleName,
      roleWeight: payload.roleWeight,
      assignedEstateId: payload.assignedEstateId,
      assignedAfdelingId: payload.assignedAfdelingId,
    };
  }
}
