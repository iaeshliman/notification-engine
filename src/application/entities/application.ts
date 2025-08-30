/**
 * Dependencies
 */

import { Entity, Column, PrimaryColumn, Check } from 'typeorm'

/**
 * Entity
 */

@Check(`"key" ~ '^[a-z](?:-?[a-z0-9]+)*$'`)
@Entity()
export class Application {
    @PrimaryColumn({ type: 'varchar', length: 128 })
    key: string

    @Column({ type: 'varchar', length: 256, nullable: true })
    description: string
}
