import { Body, Controller, Post, Response } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO, SignUpDTO } from './dto/auth.dto'
import { Public } from 'src/common/decorators/public.decorator'

@Controller('auth')
export class AuthController {
  /* eslint-disable */
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() authDto: LoginDTO, @Response() response) {
    const { accessToken, expiresIn, user } = await this.authService.login(authDto)
    const expires = new Date(Date.now() + expiresIn).toUTCString()
    return response.set({ 'Set-Cookie': `accessToken=${accessToken}; Secure; HttpOnly; Expires=${expires}; Path=/; SameSite=Strict;` }).json({ accessToken, user, expiresIn })
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() signupDto: SignUpDTO) {
    return this.authService.signUp(signupDto)
  }
}
