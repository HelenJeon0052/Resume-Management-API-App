import { BadRequestException, Body, Controller, Headers, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

import { LoginReqDTO, SignupReqDTO } from './dto/req.dto';
import { LoginResDTO, SignupResDTO } from './dto/res.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiGetResponse, ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { iUserAuth, User } from 'src/common/decorator/user.decorator';
import { RefreshTokenDTO } from './dto/res.dto';

@ApiTags('authentication')
@ApiExtraModels(LoginResDTO, SignupResDTO, RefreshTokenDTO)
@Controller('api/auth')
export class AuthController {
  constructor (
        private authService: AuthService
  ) {}

  
  /* @ApiPostResponse(SignupResDTO)*/
  @ApiCreatedResponse({
      schema: {
        allOf: [{ $ref:getSchemaPath(SignupResDTO)}]
    }
  })
  @Public()
  @Post('signup')
  async signup(@Body() { email, password, passwordValidation }: SignupReqDTO) {

      if(password !== passwordValidation) {
            throw new BadRequestException('Password is not validated.-signup')
      }

      const { id } = await this.authService.signup(email, password)
      return { id }
  }

  @ApiPostResponse(LoginResDTO)
  @Public()
  @Post('login')
  async login(@Body() { email, password }: LoginReqDTO) {
      return this.authService.login(email, password)
  }

  @ApiPostResponse(RefreshTokenDTO)
  @ApiBearerAuth()
  @Post('refresh')
  async refresh(
    @Headers('authorization') authorization,
    @User() user: iUserAuth
  ) {
    const match = /Bearer\s(.+)/.exec(authorization) //authorization is a valid string and actually starts with 'Bearer '
    const token = match ? match[1] : null
    const { accessToken, refreshTokenValue } = await this.authService.refresh(token, user.id)
    return { accessToken, refreshTokenValue }
  }
}
