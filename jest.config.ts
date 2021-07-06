import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
    verbose: true,
    preset: 'jest-playwright-preset',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
export default config
