/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Application Module
import { Application } from './entities/application'
import { ApplicationService } from './service'
import { ApplicationController } from './controller'

/**
 * Module
 */

@Module({
    imports: [TypeOrmModule.forFeature([Application])],
    providers: [ApplicationService],
    controllers: [ApplicationController],
})
export class ApplicationModule {}
