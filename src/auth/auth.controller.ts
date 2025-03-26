import { Body, Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

import { LoginReqDTO, SignupReqDTO } from './dto/req.dto';

@ApiTags('authentication')
@Controller('api/auth')
export class AuthController {
  constructor (
        private authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDTO) {
        return this.authService.signup('email', 'password')
  }

  @Post('login')
  async login(@Body() loginReqDto: LoginReqDTO) {
        return this.authService.login({})
  }
}
