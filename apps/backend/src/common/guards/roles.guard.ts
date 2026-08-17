import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface RequestWithUser {
  user?: {
    roleName?: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    if (!user || !user.roleName) {
      throw new ForbiddenException(
        'Akses ditolak: Data otentikasi role tidak ditemukan.',
      );
    }

    const hasRole = requiredRoles.includes(user.roleName);
    if (!hasRole) {
      throw new ForbiddenException(
        `Akses ditolak: Anda tidak memiliki role yang diizinkan (${requiredRoles.join(', ')}).`,
      );
    }

    return true;
  }
}
