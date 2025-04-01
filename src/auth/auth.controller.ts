import { BadRequestException, Body, Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

import { LoginReqDTO, SignupReqDTO } from './dto/req.dto';
import { LoginResDTO, SignupResDTO } from './dto/res.dto';
import { ApiCreatedResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiGetResponse, ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('authentication')
@ApiExtraModels(LoginResDTO, SignupResDTO)
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
}
