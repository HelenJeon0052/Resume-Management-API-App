import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ResumesService } from './resumes.service'

import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResumeReqDTO, FindResumeReqDTO } from './dto/req.dto';

@ApiTags('resume')
@ApiExtraModels(CreateResumeReqDTO, FindResumeReqDTO)
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('resume'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateResumeReqDTO
  ) {
    return this.resumesService.create()
  }

  @Get()
  findAll() {
    return this.resumesService.findAll()
  }

  @Get(':id')
  findOne(@Param() findResumeReqDto: FindResumeReqDTO) {
    return this.resumesService.findOne(findResumeReqDto.id)
  }

  @Get(':id/donwload')
  async donwload(@Param() findResumeReqDto: FindResumeReqDTO) {
    return await this.resumesService.donwload(findResumeReqDto.id)
  }
}
