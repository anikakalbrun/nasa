const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
      "^@/app/interfaces/(.*)$": "<rootDir>/src/app/interfaces/$1",
      "^@/app/lib/(.*)$": "<rootDir>/src/app/lib/$1",
      "^@/app/pictureOfDay/(.*)$": "<rootDir>/src/app/pictureOfDay/$1",
      "^@/app/ui/(.*)$": "<rootDir>/src/app/ui/$1",
      "^@/app/utils/(.*)$": "<rootDir>/src/app/utils/$1",
    }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)