module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  testEnvironment:'jsdom',
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
}