import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
    roots: ['<rootDir>'],
    verbose: true,
    preset: 'jest-playwright-preset',
    testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
    setupFilesAfterEnv: ['expect-playwright', '<rootDir>/setupTests.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium', 'firefox', 'webkit'],
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
