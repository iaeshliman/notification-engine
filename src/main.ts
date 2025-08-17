/**
 * Dependencies
 */

// NestJS Libraries
import { NestFactory } from '@nestjs/core'
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
