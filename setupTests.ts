import { loadEnvConfig } from '@next/env'
import { expect } from '@playwright/test'
import { matchers } from 'expect-playwright'

expect.extend(matchers)
loadEnvConfig(__dirname, true, { info: () => null, error: console.error })
