/**
 * Dependencies
 */

// NestJS Libraries
import { NestFactory } from '@nestjs/core'

// Modules
import { RootModule } from './module'

/**
 * Bootstrap
 */

async function bootstrap() {
    const app = await NestFactory.create(RootModule)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
