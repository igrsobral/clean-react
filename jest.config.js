module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/main/test/cypress",
  ],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    '\\.scss$': 'identity-obj-proxy',
  },
}