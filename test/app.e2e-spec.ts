import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { RootModule } from '../src/module'

describe('AppController (e2e)', () => {
    let app: INestApplication<App>

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [RootModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })
})
