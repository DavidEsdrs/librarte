import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  /* eslint-disable */
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (!user) {
      throw new UnauthorizedException()
    }
    const pwdMatches = await verify(user.hashPassword, password)
    if (!pwdMatches) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload)
    return {
      accessToken,
      user: { id: user.id, name: user.username, email: user.email },
      expiresIn: ms(process.env.JWT_SECRET_LIFESPAN),
    }
  }

  async signUp(args: {
    username: string
    email: string
    password: string
    name: string
  }) {
    const userAlreadyExist = await this.prisma.user.findFirst({
      where: { email: args.email },
    })
    if (userAlreadyExist) {
      throw new UnauthorizedException()
    }
    const hashPassword = await hash(args.password)
    try {
      const user = await this.prisma.user.create({
        data: {
          username: args.username,
          email: args.email,
          hashPassword,
          profile: {
            create: {
              name: args.name,
            },
          },
        },
      })
      return user
    } catch(err) {
      throw new UnprocessableEntityException()
    }
  }

  async verifyUserByToken(token: string): Promise<User | undefined> {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    })

    const userId = payload.sub

    if (userId) {
      return this.prisma.user.findUnique({
        where: { id: userId },
      })
    }
  }
}
