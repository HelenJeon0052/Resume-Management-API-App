import { Controller, Get, UseGuards , Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service'

import { FindUserReqDTO } from './dto/req.dto'
import { FindUserResDTO } from './dto/res.dto';
import { PageReqDTO } from 'src/common/dto/req.dto';
import { PagingResDTO } from 'src/common/dto/res.dto';
import { ApiGetResponse, ApiGetItemsRes } from 'src/common/decorator/swagger.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { iUserAuth } from 'src/common/decorator/user.decorator';

@ApiTags('User')
@ApiExtraModels(FindUserReqDTO, FindUserResDTO, PageReqDTO, PagingResDTO)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiGetItemsRes(FindUserResDTO)
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() {page, items, sort}: PageReqDTO, @User() user: iUserAuth) {
        return this.userService.findAll()
  }

  @ApiGetResponse(FindUserResDTO)
  @Get(':id')
  findOne(@Param() { id }: FindUserReqDTO) {
        return this.userService.findOne(id)
  }
}
