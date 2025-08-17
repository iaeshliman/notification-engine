/**
 * Dependencies
 */

// NestJS Libraries
import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Modules
import { RootModule } from './module'

/**
 * Bootstrap
 */

async function bootstrap() {
    /**
     * Create application
     */

    const app = await NestFactory.create(RootModule)

    /**
     * Configure application
     */

    app.enableShutdownHooks()
    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI })

    /**
     * TODO
     */

    /**
     * Start applications
     */

    const configService = app.get(ConfigService)
    const port = configService.get<number>('application.port')!

    await app.listen(port)
}
bootstrap()
