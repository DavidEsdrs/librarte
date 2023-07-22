import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  /* eslint-disable */
  constructor(private prisma: PrismaService) {}

  async addRole({
    user_id,
    type,
    requester_id,
  }: {
    type: 'ADMIN' | 'USER' | 'GUEST'
    user_id: number
    requester_id: number
  }) {
    const requester = await this.prisma.user.findUnique({
      where: {
        id: requester_id,
      },
      include: {
        roles: true,
      },
    })
    if (!requester) {
      throw new UnauthorizedException()
    }
    const canPerformAction = requester.roles.some((r) => r.type === 'ADMIN')
    if (!canPerformAction) {
      throw new ForbiddenException()
    }
    await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        roles: {
          create: [{ type }],
        },
      },
    })
  }
}
