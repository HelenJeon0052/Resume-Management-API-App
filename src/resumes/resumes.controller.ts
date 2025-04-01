import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ResumesService } from './resumes.service'

import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResumeReqDTO, FindResumeReqDTO } from './dto/req.dto';
import { PageReqDTO } from 'src/common/dto/req.dto';
import { PagingResDTO } from 'src/common/dto/res.dto';
import { ApiGetItemsRes, ApiGetResponse, ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { CreateContResDTO, FindContResDTO } from './dto/res.dto';

@ApiTags('resume')
@ApiExtraModels(CreateContResDTO, CreateResumeReqDTO, FindContResDTO, FindResumeReqDTO, PagingResDTO)
@Controller('api/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @ApiBearerAuth()
  @ApiPostResponse(CreateContResDTO)
  @Post()
  @UseInterceptors(FileInterceptor('resume'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateResumeReqDTO
  ) {
    return this.resumesService.create()
  }

  @ApiBearerAuth()
  @ApiGetItemsRes(FindContResDTO)
  @Get()
  findAll(@Query() { page, items, sort }: PageReqDTO) {
    return this.resumesService.findAll()
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindContResDTO)
  @Get(':id')
  findOne(@Param() { id }: FindResumeReqDTO) {
    return this.resumesService.findOne(id)
  }

  @ApiBearerAuth()
  @Get(':id/donwload')
  async donwload(@Param() { id }: FindResumeReqDTO) {
    return await this.resumesService.donwload(id)
  }
}
