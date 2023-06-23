import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO, SignUpDTO } from './dto/auth.dto'
import { Public } from 'src/common/decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() authDto: LoginDTO) {
    return this.authService.login(authDto)
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() signupDto: SignUpDTO) {
    return this.authService.signUp(signupDto)
  }
}
