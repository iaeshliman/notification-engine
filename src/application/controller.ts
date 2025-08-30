/**
 * Dependecnies
 */

// NestJS Libaries
import { Controller, Get, Query } from '@nestjs/common'

// Pagination
import { Page } from '../pagination/interfaces'

// Application Module
import { Application } from './entities/application'
import { ApplicationService } from './service'
import { FindApplicationDto } from './dto/find'

/**
 * Controller
 */

@Controller({ path: 'application', version: '1' })
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get()
    async findMany(@Query() findApplicationDto: FindApplicationDto): Promise<Page<Application>> {
        return this.applicationService.findMany(findApplicationDto)
    }
}
