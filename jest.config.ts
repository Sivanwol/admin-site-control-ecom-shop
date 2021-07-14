import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
    roots: ['<rootDir>'],
    verbose: true,
    preset: 'jest-playwright-preset',
    testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
    setupFilesAfterEnv: ['expect-playwright', '<rootDir>/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@api(.*)$': '<rootDir>/src/api$1',
        '^@models(.*)$': '<rootDir>/src/models$1',
        '^@connectors(.*)$': '<rootDir>/src/connectors$1',
        '^@screens(.*)$': '<rootDir>/src/screens$1',
        '^@hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@services(.*)$': '<rootDir>/src/services$1',
        '^@validation(.*)$': '<rootDir>/src/validation$1',
        '^@constants(.*)$': '<rootDir>/src/constants$1',
        '^@context(.*)$': '<rootDir>/src/context$1',
        '^@queries(.*)$': '<rootDir>/src/queries$1',
        '^@data(.*)$': '<rootDir>/src/data$1',
        '^@typeDefs(.*)$': '<rootDir>/src/types$1',
        '^@generated(.*)$': '<rootDir>/src/generated$1',
    },

    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testEnvironmentOptions: {
        'jest-playwright': {
            // browsers: ['chromium', 'firefox', 'webkit'], // we active this if we need for more test browsers (later date)
            browsers: ['chromium'],
            exitOnPageError: false, // GitHub currently throws errors
            launchOptions: {
                headless: true,
            },
        },
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
}
export default config
