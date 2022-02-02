module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '**/*.d.ts'
  ],
  testEnvironment:'jsdom',
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    '\\.scss$': 'identity-obj-proxy',
  },
}