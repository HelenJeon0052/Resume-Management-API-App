import { Controller, Get, Param } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service'

import { FindUserReqDTO } from './dto/req.dto'

@ApiTags('user')
@ApiExtraModels(FindUserReqDTO)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
        return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param() findReqDto: FindUserReqDTO) {
        return this.userService.findOne(findReqDto.id)
  }
}
