/**
 * Dependencies
 */

// NestJS Libraries
import { Test, TestingModule } from '@nestjs/testing'
import { TerminusModule } from '@nestjs/terminus'

// Modules
import { ConfigurationModule } from '../configuration/module'

// Health Module
import { HealthController } from './controller'
import { ApplicationHealthIndicator } from './indicators/application'

/**
 * Test
 */

describe('HealthController', () => {
    let controller: HealthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TerminusModule, ConfigurationModule],
            controllers: [HealthController],
            providers: [ApplicationHealthIndicator],
        }).compile()

        controller = module.get<HealthController>(HealthController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()

        controller.liveness()
    })

    describe('liveness', () => {
        it('should be defined', () => {
            expect(controller.liveness).toBeDefined()
        })

        it('should return ok', async () => {
            const result = await controller.liveness()

            expect(result.status).toBe('ok')
        })

        it('should check only required indicators', async () => {
            const result = await controller.liveness()
            const found = Object.keys(result.details)
            const expected = ['application']

            expect(found).toEqual(expect.arrayContaining(expected))
            expect(expected).toEqual(expect.arrayContaining(found))
        })
    })

    describe('readiness', () => {
        it('should be defined', () => {
            expect(controller.readiness).toBeDefined()
        })

        it('should return ok', async () => {
            const result = await controller.readiness()

            expect(result.status).toBe('ok')
        })

        it('should check only required indicators', async () => {
            const result = await controller.readiness()
            const found = Object.keys(result.details)
            const expected = ['application']

            expect(found).toEqual(expect.arrayContaining(expected))
            expect(expected).toEqual(expect.arrayContaining(found))
        })
    })
})
