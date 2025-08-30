/**
 * Dependencies
 */

// NestJS Libraries
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

// External Libraries
import { Repository } from 'typeorm'

// Application Module
import { Application } from './entities/application'
import { Page } from '../pagination/interfaces'
import { FindApplicationDto } from './dto/find'

/**
 * Service
 */

@Injectable()
export class ApplicationService {
    constructor(@InjectRepository(Application) private readonly applicationRepository: Repository<Application>) {}

    async findMany(findApplicationDto: FindApplicationDto): Promise<Page<Application>> {
        const filter = findApplicationDto.cursor?.filter ?? findApplicationDto.filter
        const sort = findApplicationDto.cursor?.sort ?? findApplicationDto.sort

        const options = { filter, sort }

        return { total: 0, count: 0, results: [options as any] }
    }
}
