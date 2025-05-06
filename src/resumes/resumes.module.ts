import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resumes } from './entity/resumes.entity';

import { ResumesController } from './resumes.controller'
import { ResumesService } from './resumes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resumes])],
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService]
})
export class ResumesModule {}
