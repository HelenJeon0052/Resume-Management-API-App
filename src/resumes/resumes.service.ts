import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Resumes } from './entity/resumes.entity'

@Injectable()
export class ResumesService {
    constructor(
        @InjectRepository(Resumes)
        private resumesRepository: Repository<Resumes>
    ) {}

    async create() {
        return 'create'
    }

    async findAll() {
        return 'findAll'
    }

    async findOne(id: string) {
        return 'findOne resumes'
    }

    async donwload(id: string) {
        return 'download resumes'
    }
}
