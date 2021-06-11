module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  coverageDirectory: 'coverage',
  testEnvironment:'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}